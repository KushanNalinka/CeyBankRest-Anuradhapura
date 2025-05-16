import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const BillsPage = () => {
  const { reservationId } = useParams();
  const [roomBills, setRoomBills] = useState([]);
  const [finalBill, setFinalBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const printRef = useRef();

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const [roomRes, finalRes] = await Promise.all([
          axios.get(`${API_URL}/reservations/${reservationId}/bills`),
          axios.get(`${API_URL}/reservations/${reservationId}/final-bill`)
        ]);

        setRoomBills(roomRes.data.roomBillsList);
        setFinalBill(finalRes.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch bills.');
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, [reservationId]);

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  if (loading) return <p className="p-4">Loading…</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-[#24256D] border-b pb-2">
          🧾 Reservation #{reservationId} — Bills Summary
        </h2>
        <button
          onClick={handlePrint}
          className="bg-[#FFC10C] text-[#24256D] px-4 py-2 rounded-md font-semibold shadow hover:brightness-90"
        >
          🖨️ Print Summary
        </button>
      </div>

      <div ref={printRef}>
        <div className="space-y-6">
          {roomBills.map((room, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="bg-[#F5F6FA] px-6 py-4 rounded-t-xl flex justify-between items-center">
                <h3 className="text-xl font-semibold text-[#28245F]">
                  Room No: <span className="text-[#444]">{room.roomNo}</span>
                </h3>
                <span className="text-sm bg-[#24256D] text-white px-3 py-1 rounded-full">
                  Room Bill Summary
                </span>
              </div>

              <div className="px-6 py-4">
                {/* Food Bills */}
                <div className="mb-4">
                  <h4 className="text-lg font-medium text-gray-700 mb-2">
                    🍽️ Food Bills
                  </h4>
                  {room.foodBills.length > 0 ? (
                    <div className="space-y-2">
                      {room.foodBills.map((bill) => (
                        <div
                          key={bill.billId}
                          className="bg-[#F9FAFB] p-3 rounded-md border flex justify-between items-center text-sm text-gray-700"
                        >
                          <span>
                            <span className="font-semibold text-[#24256D]">
                              #{bill.billId}
                            </span>{' '}
                            • {bill.mealType} • {bill.date}
                          </span>
                          <span className="font-bold text-right">
                            Rs {bill.grandTotal.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm italic text-gray-500">No food bills found.</p>
                  )}
                </div>

                {/* Beverage Bills */}
                <div>
                  <h4 className="text-lg font-medium text-gray-700 mb-2">
                    🍷 Beverage Bills
                  </h4>
                  {room.beverageBills.length > 0 ? (
                    <div className="space-y-2">
                      {room.beverageBills.map((bill) => (
                        <div
                          key={bill.billId}
                          className="bg-[#F9FAFB] p-3 rounded-md border flex justify-between items-center text-sm text-gray-700"
                        >
                          <span>
                            <span className="font-semibold text-[#24256D]">
                              #{bill.billId}
                            </span>{' '}
                            • {bill.mealType || '—'} • {bill.date}
                          </span>
                          <span className="font-bold text-right">
                            Rs {bill.grandTotal.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm italic text-gray-500">No beverage bills found.</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final Bill Section */}
        {finalBill && (
          <div className="bg-[#E3E6F6] mt-10 p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-[#24256D] mb-4">💰 Final Bill Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-base text-gray-700">
              <div><strong>Room Charges:</strong> Rs {finalBill.roomCharges.toLocaleString()}</div>
              <div><strong>Food Total:</strong> Rs {finalBill.foodTotal.toLocaleString()}</div>
              <div><strong>Beverage Total:</strong> Rs {finalBill.beverageTotal.toLocaleString()}</div>
              <div><strong>Advance Paid:</strong> Rs {finalBill.advance.toLocaleString()}</div>
              <div className="col-span-2 mt-4 text-lg font-bold text-[#28245F] border-t pt-2">
                Final Total: Rs {finalBill.finalTotal.toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8">
        <Link
          to="/reservations"
          className="inline-block bg-[#24256D] text-white px-4 py-2 rounded shadow hover:bg-[#1b1c50]"
        >
          ← Back to Reservations
        </Link>
      </div>
    </div>
  );
};

export default BillsPage;
