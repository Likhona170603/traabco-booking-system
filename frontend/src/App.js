import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import BookAService from "./pages/BookAService";
import BookingSuccess from "./pages/BookingSuccess";
import BookingFailed from "./pages/BookingFailed";

import "./App.css";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Step 1 + 2 combined: choose service, pick date/time, opens confirm modal */}
        <Route
          path="/book"
          element={<BookAService />}
        />

        {/* Shown after a successful booking submission */}
        <Route
          path="/book/success"
          element={<BookingSuccess />}
        />

        {/* Shown if the booking submission fails */}
        <Route
          path="/book/failed"
          element={<BookingFailed />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;   
