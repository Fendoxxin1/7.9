import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCar } from "../../api/hooks/useCar"; // faqat hookni ishlatamiz
import type { ICar } from "../../types";

const initialForm: ICar = {
  name: "",
  price: "",
  brand: "",
  color: "",
  release_date: "",
  power: "",
};

const placeholders: Record<keyof ICar, string> = {
  id: "",
  name: "Avtomobil nomini kiriting...",
  price: "Narxini kiriting ($)...",
  brand: "Brendini yozing...",
  color: "Rangini kiriting...",
  release_date: "Chiqarilgan sanasini tanlang...",
  power: "Quvvatini kiriting (HP)...",
};

const Home: React.FC = () => {
  const [formData, setFormData] = useState<ICar>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const location = useLocation();

  // useCar hookdan mutatsiyalarni olib ishlatamiz
  const { createCar, updateCar } = useCar();

  useEffect(() => {
    const car = (location.state as any)?.editingCar as ICar | undefined;
    if (car) {
      setEditingId(Number(car.id));
      setFormData({
        id: 0,
        name: car.name ?? "",
        price: String(car.price ?? ""),
        brand: car.brand ?? "",
        color: car.color ?? "",
        release_date: car.release_date ?? "",
        power: String(car.power ?? ""),
      });
    }
  }, [location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const { id, ...rest } = formData;
      updateCar.mutate({
        id: editingId,
        data: {
          ...rest,
          price: Number(formData.price),
          power: Number(formData.power),
        },
      });
      setEditingId(null);
    } else {
      const { id, ...rest } = formData;
      createCar.mutate({
        ...rest,
        price: Number(formData.price),
        power: Number(formData.power),
      });
    }

    setFormData(initialForm);
  };

  return (
    <div className="min-h-[90vh] bg-green-50 flex items-start justify-center px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">
        <div className="bg-white rounded-xl shadow-md p-8 border border-green-200">
          <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">
            {editingId ? "Avtomobilni tahrirlash" : "Yangi avtomobil qo'shish"}
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {(
              [
                "name",
                "price",
                "brand",
                "color",
                "release_date",
                "power",
              ] as (keyof ICar)[]
            ).map((field) => (
              <input
                key={field}
                name={field}
                value={(formData as any)[field]}
                onChange={handleChange}
                type={
                  field === "price" || field === "power"
                    ? "number"
                    : field === "release_date"
                    ? "date"
                    : "text"
                }
                placeholder={placeholders[field]}
                required
                className="px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            ))}
            <button
              type="submit"
              disabled={createCar.isPending || updateCar.isPending}
              className="bg-green-600 text-white rounded-lg py-3 font-semibold hover:bg-green-700 transition disabled:opacity-60"
            >
              {createCar.isPending || updateCar.isPending
                ? "Yuklanmoqda..."
                : editingId
                ? "Saqlash"
                : "Qo'shish"}
            </button>
          </form>
        </div>

        <div className="bg-green-100 rounded-xl shadow-inner p-8 border border-green-200">
          <h2 className="text-xl font-semibold mb-4 text-green-700">
            Kiritilgan ma'lumotlar
          </h2>
          <ul className="space-y-2 text-green-800">
            <li>
              <b>Nomi:</b> {formData.name || "-"}
            </li>
            <li>
              <b>Narxi:</b> {formData.price || "-"}
            </li>
            <li>
              <b>Brendi:</b> {formData.brand || "-"}
            </li>
            <li>
              <b>Rangi:</b> {formData.color || "-"}
            </li>
            <li>
              <b>Sana:</b> {formData.release_date || "-"}
            </li>
            <li>
              <b>Quvvati:</b> {formData.power || "-"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
