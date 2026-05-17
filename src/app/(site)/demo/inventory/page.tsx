import React from 'react';

const BackOfficeDemoImplementation = () => {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Back-Office Inventory Management</h1>
            <div className="bg-white shadow rounded-lg p-6">
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-2">Item Name</th>
                            <th className="text-left py-2">SKU</th>
                            <th className="text-left py-2">Stock Level</th>
                            <th className="text-left py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="py-2">Widget A</td>
                            <td className="py-2">WID-001</td>
                            <td className="py-2">150</td>
                            <td className="py-2 text-green-600">In Stock</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-2">Gadget B</td>
                            <td className="py-2">GAD-002</td>
                            <td className="py-2">12</td>
                            <td className="py-2 text-yellow-600">Low Stock</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BackOfficeDemoImplementation;
