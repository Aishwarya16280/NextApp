import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface I_HSNSAC {
  id: string;
  code: string;
  shortDesc: string;
}

interface HSNSACState {
  hsnsacList: I_HSNSAC[];
  hsnsacDataById: I_HSNSAC | null;
  loading: boolean;
  error: string | null;
}

const initialState: HSNSACState = {
  hsnsacList: [],
  hsnsacDataById: null,
  loading: false,
  error: null
};

// Simulate delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const fetchHSNSAC = createAsyncThunk(
    'hsnsac/fetchAll',
    async () => {
      await delay(300);
      // 🔧 Dummy data
      return [
        { id: '1', code: 'HSN1001', shortDesc: 'Description for HSN1001' },
        { id: '2', code: 'HSN1002', shortDesc: 'Description for HSN1002' },
        { id: '3', code: 'HSN1003', shortDesc: 'Description for HSN1003' }
      ] as I_HSNSAC[];
    }
  );
  

export const fetchHSNSACById = createAsyncThunk(
  'hsnsac/fetchById',
  async (id: string) => {
    await delay(300);
    return { id, code: 'HSN123', shortDesc: 'Dummy description' } as I_HSNSAC;
  }
);

export const addHSNSAC = createAsyncThunk(
  'hsnsac/add',
  async (data: Partial<I_HSNSAC>) => {
    await delay(300);
    return { ...data, id: Math.random().toString() } as I_HSNSAC;
  }
);

export const modifiedHSNSAC = createAsyncThunk(
  'hsnsac/update',
  async (data: I_HSNSAC) => {
    await delay(300);
    return data;
  }
);

const hsnsacSlice = createSlice({
  name: 'hsnsac',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAll
      .addCase(fetchHSNSAC.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHSNSAC.fulfilled, (state, action: PayloadAction<I_HSNSAC[]>) => {
        state.loading = false;
        state.hsnsacList = action.payload;
      })
      .addCase(fetchHSNSAC.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch HSNSAC list';
      })

      // fetchById
      .addCase(fetchHSNSACById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHSNSACById.fulfilled, (state, action: PayloadAction<I_HSNSAC>) => {
        state.loading = false;
        state.hsnsacDataById = action.payload;
      })
      .addCase(fetchHSNSACById.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch';
      })

      // add
      .addCase(addHSNSAC.fulfilled, (state, action: PayloadAction<I_HSNSAC>) => {
        state.hsnsacList.push(action.payload);
      })

      // update
      .addCase(modifiedHSNSAC.fulfilled, (state, action: PayloadAction<I_HSNSAC>) => {
        const index = state.hsnsacList.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.hsnsacList[index] = action.payload;
        }
      });
  }
});

export default hsnsacSlice.reducer;
