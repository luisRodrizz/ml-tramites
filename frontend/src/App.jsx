/* eslint-disable react-hooks/set-state-in-effect */

import { useCallback, useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { api } from "./services/api";
import { initialForm } from "./data/catalogos";
import { LandingPage } from "./pages/LandingPage";
import { AppLayout } from "./layout/AppLayout";
import { AuthPage } from "./pages/AuthPage";
import { DashboardPage } from "./pages/DashboardPage";
import { RegistroPage } from "./pages/RegistroPage";
import { TramitesPage } from "./pages/TramitesPage";
import { AlertasPage } from "./pages/AlertasPage";
import { ReportesPage } from "./pages/ReportesPage";
import { FeedbackPage } from "./pages/FeedbackPage";
import { ModeloMLPage } from "./pages/ModeloMLPage";

function App() {
  const [view, setView] = useState("landing");
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  const [tramites, setTramites] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  const [dashboard, setDashboard] = useState({
    total_tramites: 0,
    prioridad_alta: 0,
    prioridad_media: 0,
    prioridad_baja: 0,
    finalizados: 0,
    en_revision: 0,
    observados: 0,
    promedio_estimado: 0,
    promedio_satisfaccion: 0,
    total_feedbacks: 0,
    por_prioridad: [],
    por_estado: [],
    por_area: [],
  });

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [view]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [activeTab]);

  const fetchData = useCallback(async () => {
    try {
      const [tramitesRes, dashboardRes, feedbackRes] = await Promise.all([
        api.get("/tramites"),
        api.get("/dashboard"),
        api.get("/feedback"),
      ]);

      setTramites(tramitesRes.data);
      setDashboard(dashboardRes.data);
      setFeedbacks(feedbackRes.data);
    } catch {
      toast.error(
        "No se pudo conectar con el backend. Verifica que FastAPI esté ejecutándose."
      );
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [fetchData, user]);

  const goToLogin = () => {
    setView("auth");
  };

  const handleLogin = (selectedUser) => {
    setUser(selectedUser);
    setView("app");
    setActiveTab("dashboard");
    toast.success(`Bienvenido: ${selectedUser.role}`);
  };

  const handleLogout = () => {
    setUser(null);
    setView("landing");
    setActiveTab("dashboard");
    toast.success("Sesión cerrada correctamente.");
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/tramites", form);

      toast.success(
        `Trámite registrado correctamente. Prioridad asignada: ${response.data.prioridad}.`
      );

      setForm(initialForm);
      await fetchData();
      setActiveTab("tramites");
    } catch {
      toast.error("No se pudo registrar el trámite.");
    } finally {
      setLoading(false);
    }
  };

  const updateEstado = async (tramiteId, estado) => {
    try {
      await api.put(`/tramites/${tramiteId}/estado`, { estado });

      toast.success(`Estado actualizado correctamente: ${estado}.`);
      await fetchData();
    } catch {
      toast.error("No se pudo actualizar el estado del trámite.");
    }
  };

  const createFeedback = async (payload) => {
    setFeedbackLoading(true);

    try {
      await api.post("/feedback", payload);

      toast.success("Feedback registrado correctamente.");
      await fetchData();
      setActiveTab("feedback");
    } catch {
      toast.error("No se pudo registrar el feedback.");
    } finally {
      setFeedbackLoading(false);
    }
  };

  const renderPage = () => {
    if (activeTab === "registro") {
      return (
        <RegistroPage
          form={form}
          loading={loading}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      );
    }

    if (activeTab === "tramites") {
      return <TramitesPage tramites={tramites} updateEstado={updateEstado} />;
    }

    if (activeTab === "reportes") {
      return <ReportesPage dashboard={dashboard} />;
    }

    if (activeTab === "modelo") {
      return <ModeloMLPage />;
    }

    if (activeTab === "feedback") {
      return (
        <FeedbackPage
          tramites={tramites}
          feedbacks={feedbacks}
          createFeedback={createFeedback}
          feedbackLoading={feedbackLoading}
        />
      );
    }

    if (activeTab === "alertas") {
      return <AlertasPage tramites={tramites} />;
    }

    return (
      <DashboardPage
        dashboard={dashboard}
        tramites={tramites}
        onRefresh={fetchData}
      />
    );
  };

  if (view === "landing") {
    return (
      <>
        <Toaster richColors position="top-right" />
        <LandingPage onStart={goToLogin} />
      </>
    );
  }

  if (view === "auth") {
    return (
      <>
        <Toaster richColors position="top-right" />
        <AuthPage onLogin={handleLogin} />
      </>
    );
  }

  return (
    <>
      <Toaster richColors position="top-right" />

      <AppLayout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogout={handleLogout}
      >
        {renderPage()}
      </AppLayout>
    </>
  );
}

export default App;