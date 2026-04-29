import { useState } from 'react';

export default function App() {
  const [registros, setRegistros] = useState([]);
  const [form, setForm] = useState({ placa: '', contenedor: '', precintos: '' });

  // Validación básica de contenedor (Ejemplo: 4 letras y 7 números)
  const validarContenedor = (valor) => /^[A-Z]{4}\d{7}$/.test(valor);

  const handleGuardar = (e) => {
    e.preventDefault();
    if (!validarContenedor(form.contenedor)) {
      alert("Formato de contenedor inválido (Ej: ABCD1234567)");
      return;
    }
    setRegistros([...registros, { ...form, id: Date.now(), fecha: new Date() }]);
    setForm({ placa: '', contenedor: '', precintos: '' }); // Limpiar
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* 1. Formulario de Registro */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Registro de Contenedor</h2>
          <form onSubmit={handleGuardar} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input 
              placeholder="Placa (ABC-123)" 
              className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.placa}
              onChange={(e) => setForm({...form, placa: e.target.value.toUpperCase()})}
              required
            />
            <input 
              placeholder="Contenedor (ABCD1234567)" 
              className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.contenedor}
              onChange={(e) => setForm({...form, contenedor: e.target.value.toUpperCase()})}
              required
            />
            <input 
              placeholder="Precintos" 
              className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.precintos}
              onChange={(e) => setForm({...form, precintos: e.target.value})}
              required
            />
            <button className="md:col-span-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition">
              Registrar Ingreso
            </button>
          </form>
        </section>

        {/* 2. Dashboard de Ingresos (Tabla) */}
        <section className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard - Ingresos del Día</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-sm">
                <tr>
                  <th className="px-6 py-3">Placa</th>
                  <th className="px-6 py-3">Contenedor</th>
                  <th className="px-6 py-3">Precintos</th>
                  <th className="px-6 py-3">Fecha_Registro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {registros.map((reg) => (
                  <tr key={reg.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium">{reg.placa}</td>
                    <td className="px-6 py-4 text-gray-600">{reg.contenedor}</td>
                    <td className="px-6 py-4 text-gray-600">{reg.precintos}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{reg.fecha.toLocaleString('es-ES', { hour12: false }).replace(',', '')}</td>
                  </tr>
                ))}
                {registros.length === 0 && (
                  <tr><td colSpan="4" className="px-6 py-10 text-center text-gray-400">No hay registros hoy.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
        
      </div>
    </div>
  );
}