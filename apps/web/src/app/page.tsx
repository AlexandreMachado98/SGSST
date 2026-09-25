import React from "react";

export default async function Home() {
  let apiStatus = "unknown";
  
  try {
    const res = await fetch("http://localhost:3001/health", { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      apiStatus = data.status === 'ok' ? "API online" : "API malformed";
    } else {
      apiStatus = "API offline (status " + res.status + ")";
    }
  } catch (error) {
    apiStatus = "API offline (connection failed)";
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">SGSST - Sistema de Gestão</h1>
      
      <div className="p-6 border rounded-lg shadow-sm w-full max-w-md bg-white">
        <h2 className="text-xl font-semibold mb-4">Teste de Integração</h2>
        <div className="flex justify-between items-center border-b pb-2 mb-2">
          <span>Frontend:</span>
          <span className="text-green-600 font-bold">Online</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Backend (API):</span>
          <span className={apiStatus === "API online" ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
            {apiStatus}
          </span>
        </div>
      </div>
    </main>
  );
}
