import React from "react";
import { useNavigate } from "react-router-dom";
import { useCar } from "../../api/hooks/useCar";
import type { ICar } from "../../types";

const Car: React.FC = () => {
  const navigate = useNavigate();
  const { getCars, deleteCar } = useCar();
  const { data: cars, isLoading } = getCars;

  const handleEdit = (car: ICar) => {
    navigate("/", { state: { editingCar: car } });
  };

  return (
    <div className="min-h-[90vh] bg-green-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-green-700 mb-6">
          Avtomobillar ro'yxati
        </h1>

        <div className="overflow-x-auto rounded-xl shadow-md border border-green-200 bg-white">
          <table className="w-full text-left border-collapse">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Nomi</th>
                <th className="p-3">Narxi</th>
                <th className="p-3">Brend</th>
                <th className="p-3">Rang</th>
                <th className="p-3">Sana</th>
                <th className="p-3">Quvvat</th>
                <th className="p-3 text-center">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-green-700">
                    Yuklanmoqda...
                  </td>
                </tr>
              )}

              {!isLoading &&
                cars?.data?.map((car: ICar, idx: number) => (
                  <tr
                    key={car.id}
                    className={`border-t border-green-200 ${
                      idx % 2 === 0 ? "bg-green-50" : "bg-white"
                    }`}
                  >
                    <td className="p-3">{idx + 1}</td>
                    <td className="p-3 font-semibold">{car.name}</td>
                    <td className="p-3">{car.price}</td>
                    <td className="p-3">{car.brand}</td>
                    <td className="p-3">{car.color}</td>
                    <td className="p-3">{car.release_date}</td>
                    <td className="p-3">{car.power}</td>
                    <td className="p-3">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEdit(car)}
                          className="px-3 py-1 rounded-lg text-sm bg-green-600 text-white hover:bg-green-700"
                        >
                          Tahrirlash
                        </button>
                        <button
                          onClick={() => {
                            if (typeof car.id === "number") {
                              deleteCar.mutate(car.id);
                            }
                          }}
                          className="px-3 py-1 rounded-lg text-sm bg-red-500 text-white hover:bg-red-600"
                        >
                          O'chirish
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

              {!isLoading && cars?.data.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center p-6 text-green-700 font-medium"
                  >
                    Avtomobillar hali qo'shilmagan 🚗
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Car;
