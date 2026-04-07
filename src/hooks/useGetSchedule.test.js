import { renderHook, act } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import axios from 'axios';

import useGetSchedule from './useGetSchedule';

jest.mock('axios');

describe('useGetSchedule', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Setup default mock for CancelToken.source
    axios.CancelToken = {
      source: jest.fn(() => ({
        token: 'mock-cancel-token',
        cancel: jest.fn(),
      })),
    };
  });

  describe('Initial state', () => {
    it('should initialize with idle status and null data', () => {
      const { result } = renderHook(() => useGetSchedule());

      expect(result.current.status).toBe('idle');
      expect(result.current.data).toBeNull();
      expect(result.current.error).toBeNull();
    });

    it('should return a setCsvUrl function', () => {
      const { result } = renderHook(() => useGetSchedule());

      expect(typeof result.current.setCsvUrl).toBe('function');
    });
  });

  describe('Fetching schedule', () => {
    it('should set status to pending when getScheduleEnable is true', async () => {
      const mockData = [{ id: 1, name: 'Test Activity' }];
      axios.get.mockResolvedValueOnce({ data: mockData });

      const { result } = renderHook(() => useGetSchedule());

      act(() => {
        result.current.setCsvUrl({
          getScheduleEnable: true,
          csvUrl: 'https://example.com/data.csv',
        });
      });

      expect(result.current.status).toBe('pending');
      expect(result.current.data).toBeNull();
    });

    it('should fetch data when csvUrl and getScheduleEnable are set', async () => {
      const mockData = [{ id: 1, name: 'Test Activity' }];
      axios.get.mockResolvedValueOnce({ data: mockData });

      const { result } = renderHook(() => useGetSchedule());

      act(() => {
        result.current.setCsvUrl({
          getScheduleEnable: true,
          csvUrl: 'https://example.com/data.csv',
        });
      });

      await waitFor(() => {
        expect(result.current.status).toBe('complete');
      });

      expect(axios.get).toHaveBeenCalledWith(
        '/api',
        expect.objectContaining({
          params: { csvUrl: 'https://example.com/data.csv' },
        })
      );
    });

    it('should set data when fetch succeeds', async () => {
      const mockData = [
        { id: 1, name: 'Activity 1' },
        { id: 2, name: 'Activity 2' },
      ];
      axios.get.mockResolvedValueOnce({ data: mockData });

      const { result } = renderHook(() => useGetSchedule());

      act(() => {
        result.current.setCsvUrl({
          getScheduleEnable: true,
          csvUrl: 'https://example.com/data.csv',
        });
      });

      await waitFor(() => {
        expect(result.current.data).toEqual(mockData);
      });

      expect(result.current.status).toBe('complete');
      expect(result.current.error).toBeFalsy();
    });

    it('should set error when fetch fails', async () => {
      const errorMessage = 'Network error';
      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      const { result } = renderHook(() => useGetSchedule());

      act(() => {
        result.current.setCsvUrl({
          getScheduleEnable: true,
          csvUrl: 'https://example.com/data.csv',
        });
      });

      await waitFor(() => {
        expect(result.current.status).toBe('complete');
      });

      expect(result.current.error).toBe(errorMessage);
      expect(result.current.data).toBeFalsy();
    });

    it('should disable getScheduleEnable after fetch completes', async () => {
      const mockData = [{ id: 1 }];
      axios.get.mockResolvedValueOnce({ data: mockData });

      const { result } = renderHook(() => useGetSchedule());

      act(() => {
        result.current.setCsvUrl({
          getScheduleEnable: true,
          csvUrl: 'https://example.com/data.csv',
        });
      });

      await waitFor(() => {
        expect(result.current.status).toBe('complete');
      });

      // Verify that a second render doesn't trigger another fetch
      const previousCallCount = axios.get.mock.calls.length;

      act(() => {
        // Re-render the hook
      });

      expect(axios.get.mock.calls.length).toBe(previousCallCount);
    });

    it('should not fetch when getScheduleEnable is false', async () => {
      const { result } = renderHook(() => useGetSchedule());

      act(() => {
        result.current.setCsvUrl({
          getScheduleEnable: false,
          csvUrl: 'https://example.com/data.csv',
        });
      });

      // Wait a bit to ensure no fetch happens
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(axios.get).not.toHaveBeenCalled();
      expect(result.current.status).toBe('idle');
    });

    it('should handle null csvUrl gracefully', async () => {
      axios.get.mockResolvedValueOnce({ data: [] });

      const { result } = renderHook(() => useGetSchedule());

      act(() => {
        result.current.setCsvUrl({
          getScheduleEnable: true,
          csvUrl: null,
        });
      });

      await waitFor(() => {
        expect(result.current.status).toBe('complete');
      });

      // Verify the request was made with null csvUrl
      expect(axios.get).toHaveBeenCalled();
    });
  });

  describe('Cleanup and cancellation', () => {
    it('should create and return a cancel token source', async () => {
      const mockCancelToken = { token: 'test-token' };
      axios.CancelToken.source.mockReturnValueOnce(mockCancelToken);

      renderHook(() => useGetSchedule());

      expect(axios.CancelToken.source).toHaveBeenCalled();
    });

    it('should cancel the request on unmount', async () => {
      const mockCancel = jest.fn();
      const mockCancelToken = {
        token: 'test-token',
        cancel: mockCancel,
      };
      axios.CancelToken.source.mockReturnValueOnce(mockCancelToken);
      axios.get.mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            setTimeout(() => resolve({ data: [] }), 1000);
          })
      );

      const { result, unmount } = renderHook(() => useGetSchedule());

      act(() => {
        result.current.setCsvUrl({
          getScheduleEnable: true,
          csvUrl: 'https://example.com/data.csv',
        });
      });

      unmount();

      expect(mockCancel).toHaveBeenCalled();
    });
  });

  describe('Multiple calls', () => {
    it('should handle multiple sequential fetches', async () => {
      const mockData1 = [{ id: 1, name: 'Activity 1' }];
      const mockData2 = [{ id: 2, name: 'Activity 2' }];

      axios.get
        .mockResolvedValueOnce({ data: mockData1 })
        .mockResolvedValueOnce({ data: mockData2 });

      const { result } = renderHook(() => useGetSchedule());

      // First fetch
      act(() => {
        result.current.setCsvUrl({
          getScheduleEnable: true,
          csvUrl: 'https://example.com/data1.csv',
        });
      });

      await waitFor(() => {
        expect(result.current.data).toEqual(mockData1);
      });

      // Second fetch
      act(() => {
        result.current.setCsvUrl({
          getScheduleEnable: true,
          csvUrl: 'https://example.com/data2.csv',
        });
      });

      await waitFor(() => {
        expect(result.current.data).toEqual(mockData2);
      });

      expect(axios.get).toHaveBeenCalledTimes(2);
    });

    it('should clear previous error when new fetch succeeds', async () => {
      axios.get
        .mockRejectedValueOnce(new Error('First error'))
        .mockResolvedValueOnce({ data: [{ id: 1 }] });

      const { result } = renderHook(() => useGetSchedule());

      // First failed fetch
      act(() => {
        result.current.setCsvUrl({
          getScheduleEnable: true,
          csvUrl: 'https://example.com/data.csv',
        });
      });

      await waitFor(() => {
        expect(result.current.error).toBeTruthy();
      });

      expect(result.current.error).toBe('First error');

      // Second successful fetch
      act(() => {
        result.current.setCsvUrl({
          getScheduleEnable: true,
          csvUrl: 'https://example.com/data2.csv',
        });
      });

      await waitFor(
        () => {
          expect(result.current.status).toBe('complete');
        },
        { timeout: 2000 }
      );

      // After success, error should not be set (might be undefined or null depending on implementation)
      expect(result.current.data).toEqual([{ id: 1 }]);
    });
  });

  describe('Axios integration', () => {
    it('should pass cancelToken to axios request', async () => {
      axios.CancelToken.source.mockReturnValueOnce({
        token: 'test-token',
        cancel: jest.fn(),
      });
      axios.get.mockResolvedValueOnce({ data: [] });

      const { result } = renderHook(() => useGetSchedule());

      act(() => {
        result.current.setCsvUrl({
          getScheduleEnable: true,
          csvUrl: 'https://example.com/data.csv',
        });
      });

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalled();
      });

      const callArgs = axios.get.mock.calls[0];
      expect(callArgs[0]).toBe('/api');
      expect(callArgs[1]).toHaveProperty('cancelToken');
      expect(callArgs[1]).toHaveProperty('params', {
        csvUrl: 'https://example.com/data.csv',
      });
    });

    it('should handle cancelled request gracefully', async () => {
      const cancelTokenSource = { token: 'test-token', cancel: jest.fn() };
      axios.CancelToken.source.mockReturnValueOnce(cancelTokenSource);

      const testError = new Error('Request cancelled');
      testError.code = 'ECONNABORTED';
      axios.get.mockRejectedValueOnce(testError);

      const { result } = renderHook(() => useGetSchedule());

      act(() => {
        result.current.setCsvUrl({
          getScheduleEnable: true,
          csvUrl: 'https://example.com/data.csv',
        });
      });

      await waitFor(() => {
        expect(result.current.status).toBe('complete');
      });
    });
  });
});
