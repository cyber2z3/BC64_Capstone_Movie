// buyTicketThunk.js

import { message } from "antd";
import { ticketService } from "../../service/ticketService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const buyTicketThunk = createAsyncThunk(
  "BuyTicketThunk/buyTicketThunk",
  async ({ payload, authorization }, { rejectWithValue }) => {
    console.log("payload check: ", payload);
    try {
      const data = await ticketService.postTicket({
        payload: payload,
        authorization: authorization,
      });
      message.success("Đặt thành công");
      return data;
    } catch (error) {
      console.log("error"); // Log error response data
      return rejectWithValue(error.response.data); // Return error response data
    }
  }
);
