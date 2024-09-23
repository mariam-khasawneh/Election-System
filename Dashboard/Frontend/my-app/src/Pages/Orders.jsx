import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [fullScreenImage, setFullScreenImage] = useState(null);


    const fetchOrders = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/get-admin-orders");
            const fetchedOrders = response.data.map(order => ({
                id: order.id,
                type: order.request_type ? 'اعلان' : 'مناظرة',
                address: order.title,
                imageUrl: order.image_url,
                description: order.description,
                planType: order.ad_plan,
                candidate1Id: order.candidate_one_id || 'N/A',
                candidate2Id: order.candidate_two_id || 'N/A',
                status: order.acceptable ? 'مقبول' : 'مرفوض',
            }));
            
            // فرز الطلبات حسب الـ ID من الأصغر إلى الأكبر
            const sortedOrders = fetchedOrders.sort((a, b) => a.id - b.id);
            
            setOrders(sortedOrders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };
    

    useEffect(() => {
        fetchOrders();
    }, []);


    const toggleStatus = (orderId) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === orderId
                    ? { ...order, status: order.status === 'مرفوض' ? 'مقبول' : 'مرفوض' }
                    : order
            )
        );
    };

    const handleConfirm = async () => {
        try {
    
            await axios.put(`http://localhost:3000/api/update-order/${selectedOrder}`, {

                acceptable: orders.find(order => order.id === selectedOrder).status === 'مرفوض'
            });

    
            toggleStatus(selectedOrder);
        } catch (error) {
            console.error("Error updating order status:", error);
        } finally {
            setSelectedOrder(null); 
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl lg:text-4xl font-bold mb-4 text-black">الطلبات</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr>
                            <th className="py-3 px-4 text-center bg-[#374151] text-white text-sm lg:text-base">ID</th>
                            <th className="py-3 px-4 text-center bg-[#374151] text-white text-sm lg:text-base">نوع الطلب</th>
                            <th className="py-3 px-4 text-center bg-[#374151] text-white text-sm lg:text-base">عنوان المنتج</th>
                            <th className="py-3 px-4 text-center bg-[#374151] text-white text-sm lg:text-base">الصورة</th>
                            <th className="py-3 px-4 text-center bg-[#374151] text-white text-sm lg:text-base">الوصف</th>
                            <th className="py-3 px-4 text-center bg-[#374151] text-white text-sm lg:text-base">نوع الخطة</th>
                            <th className="py-3 px-4 text-center bg-[#374151] text-white text-sm lg:text-base">الرقم الوطني الأول</th>
                            <th className="py-3 px-4 text-center bg-[#374151] text-white text-sm lg:text-base">الرقم الوطني الثاني</th>
                            <th className="py-3 px-4 text-center bg-[#374151] text-white text-sm lg:text-base">الحالة</th>
                            <th className="py-3 px-4 text-center bg-[#374151] text-white text-sm lg:text-base">القبول</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-b last:border-none font-bold">
                                <td className="py-3 px-4 text-xs lg:text-sm text-center">{order.id}</td>
                                <td className="py-3 px-4 text-xs lg:text-sm text-center">{order.type}</td>
                                <td className="py-3 px-4 text-xs lg:text-sm text-center">{order.address}</td>
                                <td className="py-3 px-4 text-xs lg:text-sm text-center">
                                    <img
                                        src={order.imageUrl}
                                        alt="Order"
                                        className="w-12 h-12 object-cover cursor-pointer transition-transform duration-200 hover:scale-110"
                                        onClick={() => setFullScreenImage(order.imageUrl)}
                                    />
                                </td>
                                <td className="py-3 px-4 text-xs lg:text-sm max-w-xs lg:max-w-sm overflow-y-auto" style={{ maxHeight: '80px' }}>
                                    {order.description}
                                </td>
                                <td className="py-3 px-4 text-xs lg:text-sm text-center">{order.planType}</td>
                                <td className="py-3 px-4 text-xs lg:text-sm text-center">{order.candidate1Id}</td>
                                <td className="py-3 px-4 text-xs lg:text-sm text-center">{order.candidate2Id}</td>
                                <td className={`py-3 px-4 font-bold text-xs lg:text-sm text-center ${order.status === 'مقبول' ? 'text-green-600' : 'text-red-600'}`}>
                                    {order.status}
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <button
                                        onClick={() => setSelectedOrder(order.id)}
                                        className="bg-green-600 text-white py-1 lg:py-2 px-3 lg:px-4 rounded hover:bg-green-700 transition duration-200"
                                    >
                                        {order.status === 'مرفوض' ? 'قبول' : 'رفض'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    
            {selectedOrder && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="bg-white p-6 lg:p-10 rounded-xl shadow-2xl max-w-sm lg:max-w-lg w-full mx-4">
                        <h2 className="text-xl lg:text-2xl font-extrabold text-gray-800 mb-4 lg:mb-6 text-center">هل تريد تغيير حالة الطلب؟</h2>
                        <div className="flex justify-center space-x-2 lg:space-x-4">
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="ml-4 bg-gray-300 text-gray-800 py-2 px-4 rounded-lg text-sm lg:text-lg font-medium hover:bg-gray-400 transition duration-200"
                            >
                                إلغاء
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="bg-green-600 text-white py-2 px-4 rounded-lg text-sm lg:text-lg font-medium hover:bg-green-700 transition duration-200"
                            >
                                تأكيد
                            </button>
                        </div>
                    </div>
                </div>
            )}
    
            {fullScreenImage && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
                    onClick={() => setFullScreenImage(null)}
                >
                    <img src={fullScreenImage} alt="Full Screen" className="max-w-full max-h-full" />
                </div>
            )}
        </div>
    );
    
}

export default Orders;
