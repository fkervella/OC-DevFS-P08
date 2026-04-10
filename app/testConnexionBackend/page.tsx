"use client";

import { useEffect, useState } from "react";

import { apiClient } from "@/services/backend/apiClient";
import { BackendProperty } from "@/types/backendApiTypes";

type Status = "idle" | "loading" | "success" | "error";

export default function TestPropertiesPage() {
  const [properties, setProperties] = useState<BackendProperty[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [, setError] = useState<string | null>(null);

  async function fetchProperties() {
    setStatus("loading");
    setError(null);
    try {
      const data = await apiClient.get("properties");
      setProperties(data as BackendProperty[]);
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setStatus("error");
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProperties();
  }, []);

  return (
    <main>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <span> API TEST — GET /api/properties</span>

        {status === "success" && properties.length === 0 && (
          <p style={{ color: "#6b6b6b", fontStyle: "italic" }}>
            Aucune propriété retournée par le backend.
          </p>
        )}

        {/* Raw JSON toggle */}
        {status === "success" && (
          <pre
            style={{
              padding: "1.5rem",
              overflowX: "auto",
              lineHeight: 1.6,
            }}
          >
            {JSON.stringify(properties, null, 2)}
          </pre>
        )}
      </div>
    </main>
  );
}
