import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const BillsPage = () => {
  const { reservationId } = useParams();
  const [roomBills, setRoomBills] = useState([]);
  const [finalBill, setFinalBill] = useState(null);
  const [additional, setAdditional] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [billState, setBillState] = useState('Not Closed');

  const [roomChargeBill, setRoomChargeBill] = useState(null);
  const [roomChargeExpanded, setRoomChargeExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const printRef = useRef();

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const [roomRes, finalRes, roomChargeRes] = await Promise.all([
          axios.get(`${API_URL}/reservations/${reservationId}/bills`),
          axios.get(`${API_URL}/reservations/${reservationId}/final-bill`),
          axios.get(`${API_URL}/reservations/${reservationId}/room-bill`)
        ]);

        setRoomBills(roomRes.data.roomBillsList);
        setFinalBill(finalRes.data);
        setRoomChargeBill(roomChargeRes.data);
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

  const handleViewItems = async (billId, type, roomIndex) => {
    try {
      const res = await axios.get(`${API_URL}/reservations/bills/${type}/${billId}`);
      const updatedRoomBills = [...roomBills];
      const bills = updatedRoomBills[roomIndex][type === 'meals' ? 'foodBills' : 'beverageBills'];
      const updatedBills = bills.map(b =>
        b.billId === billId
          ? { ...b, expanded: !b.expanded, items: res.data[type === 'meals' ? 'foodBillItems' : 'beverageBillItems'] }
          : b
      );
      updatedRoomBills[roomIndex][type === 'meals' ? 'foodBills' : 'beverageBills'] = updatedBills;
      setRoomBills(updatedRoomBills);
    } catch (err) {
      console.error('Error loading bill items:', err);
    }
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
        {/* Room Charges */}
        {/* {roomChargeBill && (
          <div className="mb-8 bg-white border shadow rounded-xl p-6">
            <div className="flex justify-between items-center mb-3">
              <div className="text-sm text-gray-700">
                <p><strong>Reservation ID:</strong> {roomChargeBill.reservationId}</p>
                <p><strong>In:</strong> {roomChargeBill.inDate}</p>
                <p><strong>Out:</strong> {roomChargeBill.outDate}</p>
                <p><strong>Nights:</strong> {roomChargeBill.nights}</p>
              </div>
              <div className="text-right font-bold text-lg text-[#28245F]">
                Room Total: Rs {roomChargeBill.roomTotal.toLocaleString()}
              </div>
            </div>
            <button
              onClick={() => setRoomChargeExpanded(!roomChargeExpanded)}
              className="text-sm bg-[#24256D] text-white px-4 py-1 rounded hover:bg-[#1c1d50]"
            >
              {roomChargeExpanded ? 'Hide Room Charges' : 'View Room Charges'}
            </button>

            {roomChargeExpanded && (
              <div className="mt-4 bg-[#F9FAFB] p-4 rounded-lg border">
                <h4 className="font-semibold mb-3 text-[#28245F]">🛏️ Room Details</h4>
                <div className="grid grid-cols-3 font-semibold text-sm text-gray-600 border-b pb-2 mb-2">
                  <span>Room No</span>
                  <span>Room Type</span>
                  <span className="text-right">Rate Per Night</span>
                </div>
                {roomChargeBill.rooms.map((room, idx) => (
                  <div key={idx} className="grid grid-cols-3 py-2 text-sm text-gray-700 border-b last:border-none">
                    <span>{room.roomNo}</span>
                    <span>{room.roomType}</span>
                    <span className="text-right">Rs {room.ratePerNight.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )} */}

         {roomChargeBill && (
          <div className="mb-8 bg-white border shadow rounded-xl p-6">
            <div className="flex justify-between items-center mb-3">
              <div className="text-sm text-gray-700">
                <p><strong>Reservation ID:</strong> {roomChargeBill.reservationId}</p>
                <p><strong>In:</strong> {roomChargeBill.inDate}</p>
                <p><strong>Out:</strong> {roomChargeBill.outDate}</p>
                <p><strong>Nights:</strong> {roomChargeBill.nights}</p>
              </div>
              <div className="text-right font-bold text-lg text-[#28245F]">
                Room Total: Rs {roomChargeBill.roomTotal.toLocaleString()}
              </div>
            </div>
            <button
              onClick={() => setRoomChargeExpanded(!roomChargeExpanded)}
              className="text-sm bg-[#24256D] text-white px-4 py-1 rounded hover:bg-[#1c1d50]"
            >
              {roomChargeExpanded ? 'Hide Room Charges' : 'View Room Charges'}
            </button>

            {roomChargeExpanded && (
              <div className="mt-4 bg-[#F9FAFB] p-4 rounded-lg border">
                <h4 className="font-semibold mb-3 text-[#28245F]">🛏️ Room Details</h4>
                <div className="grid grid-cols-4 font-semibold text-sm text-gray-600 border-b pb-2 mb-2">
                  <span>Room No</span>
                  <span>Room Type</span>
                  <span className="text-right">Rate Per Night</span>
                  <span className="text-right">Total Room Charges</span>
                </div>
                {roomChargeBill.rooms.map((room, idx) => (
                  <div key={idx} className="grid grid-cols-4 py-2 text-sm text-gray-700 border-b last:border-none">
                    <span>{room.roomNo}</span>
                    <span>{room.roomType}</span>
                    <span className="text-right">Rs {room.ratePerNight.toLocaleString()}</span>
                    <span className="text-right">
                      Rs {(room.ratePerNight * roomChargeBill.nights).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Room Bills */}
        <div className="space-y-6">
          {roomBills.map((room, roomIndex) => (
            <div
              key={roomIndex}
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
                  <h4 className="text-lg font-medium text-gray-700 mb-2">🍽️ Food Bills</h4>
                  {room.foodBills.length > 0 ? (
                    <div className="space-y-2">
                      {room.foodBills.map((bill) => (
                        <div key={bill.billId} className="bg-[#F9FAFB] p-3 rounded-md border text-sm text-gray-700">
                          <div className="flex justify-between items-center">
                            <span>
                              <span className="font-semibold text-[#24256D]">#{bill.billId}</span> • {bill.mealType} • {bill.date}
                            </span>
                            <div className="text-right space-x-2">
                              <span className="font-bold">Rs {bill.grandTotal.toFixed(2)}</span>
                              <button
                                onClick={() => handleViewItems(bill.billId, 'meals', roomIndex)}
                                className="text-xs bg-[#24256D] text-white px-3 py-1 rounded hover:bg-[#1b1c50]"
                              >
                                {bill.expanded ? 'Hide Items' : 'View Items'}
                              </button>
                            </div>
                          </div>
                          {bill.expanded && bill.items && (
                            <ul className="mt-2 divide-y divide-gray-200">
                              {bill.items.map((item) => (
                                <li key={item.id} className="py-2 flex justify-between">
                                  <span>{item.foodName} — {item.portions} portion(s)</span>
                                  <span className="font-semibold">Rs {item.total.toFixed(2)}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : <p className="text-sm italic text-gray-500">No food bills found.</p>}
                </div>

                {/* Beverage Bills */}
                <div>
                  <h4 className="text-lg font-medium text-gray-700 mb-2">🍷 Beverage Bills</h4>
                  {room.beverageBills.length > 0 ? (
                    <div className="space-y-2">
                      {room.beverageBills.map((bill) => (
                        <div key={bill.billId} className="bg-[#F9FAFB] p-3 rounded-md border text-sm text-gray-700">
                          <div className="flex justify-between items-center">
                            <span>
                              <span className="font-semibold text-[#24256D]">#{bill.billId}</span> • {bill.mealType || '—'} • {bill.date}
                            </span>
                            <div className="text-right space-x-2">
                              <span className="font-bold">Rs {bill.grandTotal.toFixed(2)}</span>
                              <button
                                onClick={() => handleViewItems(bill.billId, 'beverages', roomIndex)}
                                className="text-xs bg-[#24256D] text-white px-3 py-1 rounded hover:bg-[#1b1c50]"
                              >
                                {bill.expanded ? 'Hide Items' : 'View Items'}
                              </button>
                            </div>
                          </div>
                          {bill.expanded && bill.items && (
                            <ul className="mt-2 divide-y divide-gray-200">
                              {bill.items.map((item) => (
                                <li key={item.id} className="py-2 flex justify-between">
                                  <span>{item.beverageName} — {item.bottlesOrGlasses} glass(es)</span>
                                  <span className="font-semibold">Rs {item.total.toFixed(2)}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : <p className="text-sm italic text-gray-500">No beverage bills found.</p>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final Bill Section */}
        {/* {finalBill && (
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
        )} */}

        {/* Final Bill Section */}
{finalBill && (
  <div className="bg-[#E3E6F6] mt-10 p-6 rounded-xl shadow-lg">
    <h3 className="text-2xl font-bold text-[#24256D] mb-4">💰 Final Bill Summary</h3>

    <div className="grid grid-cols-2 gap-4 text-base text-gray-700 mb-4">
      <div><strong>Room Charges:</strong> Rs {finalBill.roomCharges.toLocaleString()}</div>
      <div><strong>Food Total:</strong> Rs {finalBill.foodTotal.toLocaleString()}</div>
      <div><strong>Beverage Total:</strong> Rs {finalBill.beverageTotal.toLocaleString()}</div>
      <div><strong>Advance Paid:</strong> Rs {finalBill.advance.toLocaleString()}</div>
    </div>

    {/* Additional Fields */}
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">➕ Additional Charges</label>
        <input
          type="number"
          min={0}
          defaultValue={0}
          onChange={(e) => setAdditional(+e.target.value || 0)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">➖ Discount</label>
        <input
          type="number"
          min={0}
          defaultValue={0}
          onChange={(e) => setDiscount(+e.target.value || 0)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">📄 Bill State</label>
        <select
          value={billState}
          onChange={(e) => setBillState(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="Not Closed">Not Closed</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
    </div>

    <div className="col-span-2 mt-4 text-lg font-bold text-[#28245F] border-t pt-2">
      Final Total:&nbsp;
      Rs {(
        finalBill.finalTotal +
        (additional || 0) -
        (discount || 0)
      ).toLocaleString()}
      &nbsp;({billState})
    </div>
  </div>
)}


      </div>

      <div className="mt-8">
        <Link to="/reservations" className="inline-block bg-[#24256D] text-white px-4 py-2 rounded shadow hover:bg-[#1b1c50]">
          ← Back to Reservations
        </Link>
      </div>
    </div>
  );
};

export default BillsPage;
