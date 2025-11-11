import { useState, useRef, useEffect } from 'react';
import { UsergroupAddOutlined, CloseOutlined, SafetyCertificateOutlined, BarChartOutlined, CommentOutlined, ScheduleOutlined, AppstoreAddOutlined, CheckCircleOutlined, WarningOutlined, PieChartOutlined, ThunderboltOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { LucideShield, LucideTarget, LucideUsers, LucideMessageCircle, LucideSmartphone, LucideLock, LucideCheckCircle2, LucideAlertTriangle, LucideTrendingUp, LucideShare2, LucideMousePointerClick, LucideShoppingCart } from 'lucide-react';

// --- DATOS MOCKUP PARA GRÁFICOS (Basados en las imágenes del PDF) ---
const dataFollowers = [
  { month: 'Mes 1', seguidores: 1000 },
  { month: 'Mes 2', seguidores: 1500 },
  { month: 'Mes 3', seguidores: 2200 },
  { month: 'Mes 4', seguidores: 3100 },
  { month: 'Mes 5', seguidores: 4200 },
  { month: 'Mes 6', seguidores: 5500 },
];

const dataInteractionTarget = [
  { name: 'Objetivo Alcanzado', value: 60 },
  { name: 'Restante', value: 40 },
];

const dataConversion = [
  { name: 'Compras/Descargas', value: 320 },
  { name: 'Visitas Web', value: 3200 },
];

// --- TIPOS PARA COMPONENTES ---
interface KpiCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  subtitle?: string;
  color?: string;
}

// --- COMPONENTES AUXILIARES ---
const KpiCard: React.FC<KpiCardProps> = ({ icon: Icon, title, value, subtitle, color = "blue" }) => (
  <div className={`bg-white p-6 rounded-xl shadow-sm border-l-4 border-${color}-500 flex items-start space-x-4 hover:shadow-md transition-shadow`}>
    <div className={`p-3 rounded-lg bg-${color}-50 text-${color}-600`}>
      <Icon size={24} />
    </div>
    <div>
      <h4 className="text-gray-500 text-sm font-medium uppercase">{title}</h4>
      <p className="text-2xl font-bold text-gray-800 my-1">{value}</p>
      {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
    </div>
  </div>
);

const PlatformCard = ({ logo, name, priority, target, formats, kpis, color }: { logo: React.ReactNode, name: string, priority: string, target: string, formats: string[], kpis: string[], color: string }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
    <div className={`h-2 bg-${color}-500`}></div>
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
           <div className={`p-2 bg-${color}-50 rounded-lg text-${color}-600 font-bold text-xl`}>
             {logo}
           </div>
           <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
          Prioridad {priority}
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-semibold text-gray-600 uppercase">Objetivo Clave</h4>
          <p className="text-gray-700 text-sm">{target}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-600 uppercase">Formatos</h4>
          <div className="flex flex-wrap gap-2 mt-1">
            {formats.map((f: string, i: number) => (
              <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">{f}</span>
            ))}
          </div>
        </div>
         <div className="pt-3 border-t border-gray-50">
          <h4 className="text-sm font-semibold text-gray-600 uppercase mb-1">KPIs Principales</h4>
          <ul className="text-sm text-gray-500 list-disc list-inside">
              {kpis.map((k: string, i: number) => <li key={i}>{k}</li>)}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// --- WIDGET DE INTEGRANTES ---
const GroupWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Hook para cerrar el menú si se hace clic fuera de él
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [widgetRef]);

  const members = [
    { name: 'Leonardo Ruiz', id: '537380' },
    { name: 'Fernando Castro', id: '525874' },
    { name: 'Laura Cespedes', id: '5200901' },
    { name: 'Sebastián Dávila', id: '5200440' },
    { name: 'Belen Garcia Moyanesi', id: '5201072' },
  ];

  return (
    <div ref={widgetRef} className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
      {/* Menú de integrantes */}
      <div className={`bg-white rounded-xl shadow-2xl p-6 w-[calc(100vw-2rem)] max-w-xs border border-slate-200 transition-all duration-300 ease-in-out origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
        <h4 className="font-bold text-slate-800 text-lg mb-4">Integrantes del Grupo</h4>
        <ul className="space-y-3">
          {members.map(member => (
            <li key={member.id} className="flex justify-between items-center text-slate-600">
              <span>{member.name}</span>
              <span className="font-mono text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">{member.id}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Botón y etiqueta */}
      <div className="flex items-center gap-3 justify-end">
        <div className={`transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
          <div className="bg-white text-slate-700 px-4 py-2 rounded-xl shadow-lg border border-slate-100">
            <span className="font-semibold text-sm">Integrantes</span>
          </div>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="bg-blue-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-all transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300" aria-label={isOpen ? "Cerrar menú de integrantes" : "Abrir menú de integrantes"}>
          {isOpen ? <CloseOutlined style={{ fontSize: '24px' }} /> : <UsergroupAddOutlined style={{ fontSize: '24px' }} />}
        </button>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function SegurAppStrategy() {
  const [activeTab, setActiveTab] = useState('inicio');

  const tabs = [
    { id: 'inicio', label: 'Inicio', icon: LucideShield },
    { id: 'objetivos', label: 'Objetivos y Producto', icon: LucideTarget },
    { id: 'plataformas', label: 'Plataformas', icon: LucideSmartphone },
    { id: 'contenido', label: 'Contenido', icon: ScheduleOutlined },
    { id: 'gestion', label: 'Gestión & Comunidad', icon: LucideUsers },
    { id: 'metricas', label: 'KPIs & Métricas', icon: LucideTrendingUp },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* WIDGET DE INTEGRANTES */}
      <GroupWidget />

      {/* HEADER / NAV */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <LucideShield className="text-white h-6 w-6" />
              </div>
              <span className="font-bold text-xl text-slate-900">SegurApp <span className="font-normal text-slate-500">Strategy</span></span>
            </div>
            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-1.5
                    ${activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                >
                  <tab.icon size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
        {/* Mobile Nav (Simple horizontal scroll) */}
        <div className="md:hidden flex overflow-x-auto px-4 py-2 space-x-2 bg-white border-t border-slate-100 scrollbar-hide">
           {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 flex items-center space-x-1
                    ${activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600'}`}
                >
                  <tab.icon size={14} />
                  <span>{tab.label}</span>
                </button>
              ))}
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* --- SECCIÓN INICIO --- */}
        {activeTab === 'inicio' && (
          <div className="animate-fadeIn">
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-8 md:p-16 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-10">
                <LucideShield size={400} />
              </div>
              <div className="relative z-10 max-w-2xl">
                <span className="inline-block py-1 px-3 rounded-full bg-blue-800 bg-opacity-30 text-blue-100 text-sm font-semibold mb-4 border border-blue-400 border-opacity-30">
                  Social Media Strategy 2025
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                  Tu escudo digital contra el fraude.
                </h1>
                <p className="text-lg md:text-xl text-blue-50 mb-8 leading-relaxed">
                  Estrategia integral para posicionar a SegurApp como el referente en seguridad digital accesible para adultos mayores en LATAM.
                </p>
                <button onClick={() => setActiveTab('objetivos')} className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center space-x-2">
                  <span>Ver Estrategia</span>
                  <LucideTarget size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600"><LucideUsers size={24} /></div>
                <div>
                  <p className="text-slate-500 text-sm font-medium">Audiencia Principal</p>
                  <p className="text-xl font-bold text-slate-800">40 - 75 años</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full text-green-600"><LucideCheckCircle2 size={24} /></div>
                 <div>
                  <p className="text-slate-500 text-sm font-medium">Enfoque</p>
                  <p className="text-xl font-bold text-slate-800">Educación y Confianza</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
                <div className="bg-amber-100 p-3 rounded-full text-amber-600"><LucideSmartphone size={24} /></div>
                 <div>
                  <p className="text-slate-500 text-sm font-medium">Canal Clave</p>
                  <p className="text-xl font-bold text-slate-800">WhatsApp & Facebook</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- SECCIÓN OBJETIVOS Y PRODUCTO --- */}
        {activeTab === 'objetivos' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Objetivo Principal */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <div className="flex items-center space-x-3 mb-6">
                <LucideTarget className="text-blue-600" size={32} />
                <h2 className="text-2xl font-bold text-slate-800">Objetivo Estratégico</h2>
              </div>
              <blockquote className="text-xl text-slate-600 border-l-4 border-blue-500 pl-6 italic mb-8">
                "Crear contenido sobre la seguridad digital que eduque, concientice y acompañe a los usuarios en la prevención de estafas digitales, fortaleciendo su confianza y posicionando a SegurApp como referente accesible y confiable."
              </blockquote>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <KpiCard icon={LucideMousePointerClick} title="Interacción" value="60%" subtitle="en contenidos educativos (6 meses)" color="blue" />
                <KpiCard icon={SafetyCertificateOutlined} title="Confianza" value="+25%" subtitle="incremento en percepción de marca" color="green" />
                <KpiCard icon={ThunderboltOutlined} title="Soporte" value="< 24h" subtitle="tiempo promedio de respuesta" color="amber" />
                <KpiCard icon={LucideShoppingCart} title="Conversión" value="10%" subtitle="de seguidores a leads calificados" color="purple" />
              </div>
            </section>

            {/* Producto */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                 <div className="flex items-center space-x-3 mb-6">
                  <LucideLock className="text-blue-600" size={28} />
                  <h2 className="text-2xl font-bold text-slate-800">El Producto: SegurApp</h2>
                </div>
                <p className="text-slate-600 mb-6">
                  Aplicación móvil pensada para proteger a las personas de estafas digitales, especialmente a quienes usan WhatsApp, correo y navegador web. Integra algoritmos de IA que analizan enlaces en tiempo real.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <h3 className="font-bold text-slate-800 mb-2 flex items-center"><CheckCircleOutlined className="mr-2 text-green-500"/> Modelo Freemium</h3>
                    <p className="text-sm text-slate-600">Versión gratuita con protección básica + Premium mensual con soporte 24/7.</p>
                  </div>
                   <div className="bg-slate-50 p-4 rounded-xl">
                    <h3 className="font-bold text-slate-800 mb-2 flex items-center"><WarningOutlined className="mr-2 text-amber-500"/> Alertas Visuales</h3>
                    <p className="text-sm text-slate-600">Sistema de semáforo fácil de entender para identificar enlaces peligrosos.</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900 text-white rounded-2xl p-8 shadow-lg relative overflow-hidden">
                <LucideUsers className="absolute bottom-[-20px] right-[-20px] text-blue-800 opacity-50" size={180} />
                <h2 className="text-2xl font-bold mb-6 relative z-10">Público Objetivo</h2>
                <div className="space-y-6 relative z-10">
                  <div>
                    <span className="inline-block px-3 py-1 bg-blue-700 rounded-full text-xs font-semibold mb-2">PRIMARIO</span>
                    <h3 className="text-xl font-bold">Adultos 40 - 75 años</h3>
                    <p className="text-blue-200 text-sm mt-1">Principiantes en tecnología, propensos a fraudes pero interesados en proteger sus ahorros.</p>
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 bg-blue-700 rounded-full text-xs font-semibold mb-2">SECUNDARIO</span>
                    <h3 className="text-xl font-bold">Familiares (Hijos/Nietos)</h3>
                    <p className="text-blue-200 text-sm mt-1">Buscan herramientas confiables para proteger a sus padres o abuelos.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* --- SECCIÓN PLATAFORMAS --- */}
        {activeTab === 'plataformas' && (
          <div className="space-y-8 animate-fadeIn">
             <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Mix de Medios Seleccionado</h2>
              <p className="text-lg text-slate-600">Priorizamos plataformas con alta penetración en el segmento 40+ y capacidades de educación directa.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* WhatsApp - P1 */}
              <PlatformCard
                logo={<LucideMessageCircle size={28} />}
                name="WhatsApp Business"
                priority="1"
                color="green"
                target="Canal directo para el segmento 40-75. Donde ocurren la mayoría de los intentos de fraude."
                formats={["Alertas Transaccionales", "Broadcasts Educativos", "Chatbot de Soporte"]}
                kpis={["Tasa de Apertura", "CTR en alertas", "Tiempo de resolución (Soporte)"]}
              />
              {/* Facebook - P2 */}
               <PlatformCard
                logo={<span className="text-2xl font-bold">f</span>}
                name="Facebook / Meta"
                priority="2"
                color="blue"
                target="Alcance masivo en 40+. Ideal para comunidades, grupos de apoyo y retargeting."
                formats={["Video Explicativo (60s)", "Carruseles paso a paso", "Ads con Testimonios"]}
                kpis={["CPA (Costo por instalación)", "Engagement en posts educativos", "ROAS"]}
              />
               {/* YouTube - P3 */}
               <PlatformCard
                logo={<span className="text-xl font-bold tracking-tighter">YT</span>}
                name="YouTube"
                priority="3"
                color="red"
                target="Búsqueda activa de ayuda. Tutoriales 'step-by-step' para usuarios mayores."
                formats={["Series 'SegurApp Explica' (3-6min)", "Shorts educativos", "Ads In-Stream"]}
                kpis={["VTR (View-Through Rate)", "Tiempo medio de visualización", "Conversiones Asistidas"]}
              />
            </div>

            <div className="mt-12 bg-slate-100 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Plataformas Secundarias & Apoyo</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl flex items-center space-x-3">
                  <div className="bg-pink-100 p-2 rounded-lg text-pink-600"><AppstoreAddOutlined /></div>
                  <div><p className="font-bold">Instagram</p><p className="text-xs text-gray-500">Reels para captar familiares.</p></div>
                </div>
                 <div className="bg-white p-4 rounded-xl flex items-center space-x-3">
                  <div className="bg-black p-2 rounded-lg text-white"><ThunderboltOutlined /></div>
                  <div><p className="font-bold">TikTok</p><p className="text-xs text-gray-500">Awareness viral 25-39 años.</p></div>
                </div>
                 <div className="bg-white p-4 rounded-xl flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-800"><UsergroupAddOutlined /></div>
                  <div><p className="font-bold">LinkedIn</p><p className="text-xs text-gray-500">Alianzas B2B (Bancos).</p></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- SECCIÓN CONTENIDO --- */}
        {activeTab === 'contenido' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 flex items-center"><ScheduleOutlined className="mr-3 text-blue-600"/>Calendario de Contenido</h2>
                  <p className="text-slate-500 mt-1">Frecuencia objetivo: 4-5 publicaciones por semana.</p>
                </div>
                <div className="hidden md:flex space-x-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Educativo</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">Testimonio</span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">Interactivo</span>
                </div>
              </div>

              {/* Calendario Visual (Semana Ejemplo) */}
              <div className="overflow-x-auto">
                <div className="min-w-[800px] grid grid-cols-5 gap-4">
                  {/* Lunes */}
                  <div className="flex flex-col space-y-3">
                    <div className="text-center font-bold text-slate-600 uppercase text-sm bg-slate-100 py-2 rounded-t-lg">Lunes</div>
                    <div className="bg-blue-50 p-4 rounded-xl border-t-4 border-blue-500 h-full flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div>
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Consejo Seguro</span>
                        <h4 className="font-bold text-slate-800 mt-2">Alerta Segura de la Semana</h4>
                        <p className="text-sm text-slate-600 mt-2 leading-snug">Gráfico simple mostrando un icono de escudo y un tip rápido.</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-blue-100 flex justify-between items-center text-xs text-blue-400">
                        <LucideSmartphone size={16} />
                        <span>Reel / Short</span>
                      </div>
                    </div>
                  </div>
                  {/* Miércoles */}
                   <div className="flex flex-col space-y-3">
                    <div className="text-center font-bold text-slate-600 uppercase text-sm bg-slate-100 py-2 rounded-t-lg">Miércoles</div>
                    <div className="bg-indigo-50 p-4 rounded-xl border-t-4 border-indigo-500 h-full flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div>
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Educativo</span>
                        <h4 className="font-bold text-slate-800 mt-2">Estafa Desenmascarada</h4>
                        <p className="text-sm text-slate-600 mt-2 leading-snug">Blog/Post largo: "Cómo llega el fraude y qué hacer".</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-indigo-100 flex justify-between items-center text-xs text-indigo-400">
                         <span className="font-bold">f</span>
                        <span>Artículo</span>
                      </div>
                    </div>
                  </div>
                  {/* Jueves */}
                   <div className="flex flex-col space-y-3">
                    <div className="text-center font-bold text-slate-600 uppercase text-sm bg-slate-100 py-2 rounded-t-lg">Jueves</div>
                    <div className="bg-green-50 p-4 rounded-xl border-t-4 border-green-500 h-full flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div>
                        <span className="text-xs font-bold text-green-600 uppercase tracking-wider">Confianza</span>
                        <h4 className="font-bold text-slate-800 mt-2">Testimonio Real</h4>
                        <p className="text-sm text-slate-600 mt-2 leading-snug">Foto/Video de usuario mayor con su familia usando la app.</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-green-100 flex justify-between items-center text-xs text-green-400">
                         <LucideUsers size={16} />
                        <span>Imagen + Cita</span>
                      </div>
                    </div>
                  </div>
                  {/* Viernes */}
                   <div className="flex flex-col space-y-3">
                    <div className="text-center font-bold text-slate-600 uppercase text-sm bg-slate-100 py-2 rounded-t-lg">Viernes</div>
                    <div className="bg-amber-50 p-4 rounded-xl border-t-4 border-amber-500 h-full flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div>
                        <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Interacción</span>
                        <h4 className="font-bold text-slate-800 mt-2">Checklist Fin de Semana</h4>
                        <p className="text-sm text-slate-600 mt-2 leading-snug">Pregunta interactiva o lista rápida de verificación.</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-amber-100 flex justify-between items-center text-xs text-amber-400">
                         <CommentOutlined />
                        <span>Encuesta</span>
                      </div>
                    </div>
                  </div>
                   {/* Sábado */}
                   <div className="flex flex-col space-y-3">
                    <div className="text-center font-bold text-slate-600 uppercase text-sm bg-slate-100 py-2 rounded-t-lg">Sábado</div>
                    <div className="bg-red-50 p-4 rounded-xl border-t-4 border-red-500 h-full flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div>
                        <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Demo</span>
                        <h4 className="font-bold text-slate-800 mt-2">Sábado de Demostración</h4>
                        <p className="text-sm text-slate-600 mt-2 leading-snug">Video en vivo o tutorial mostrando una función clave.</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-red-100 flex justify-between items-center text-xs text-red-400">
                         <span className="font-bold tracking-tighter">YT</span>
                        <span>Video</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pilares de Contenido */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500">
                <h3 className="font-bold text-lg text-slate-800 mb-2">Educación y Prevención</h3>
                <p className="text-slate-600 text-sm">Contenido didáctico sobre cómo identificar las estafas más comunes.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500">
                <h3 className="font-bold text-lg text-slate-800 mb-2">Confianza y Apoyo</h3>
                <p className="text-slate-600 text-sm">Demostrar que la app es fácil de usar y que hay humanos detrás para ayudar.</p>
              </div>
               <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-amber-500">
                <h3 className="font-bold text-lg text-slate-800 mb-2">Comunidad y Empatía</h3>
                <p className="text-slate-600 text-sm">Historias de éxito y espacios para compartir experiencias reales.</p>
              </div>
            </div>
          </div>
        )}

        {/* --- SECCIÓN GESTIÓN Y COMUNIDAD --- */}
        {activeTab === 'gestion' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeIn">
            {/* Columna Izq: Protocolo */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
               <div className="flex items-center space-x-3 mb-8">
                  <LucideMessageCircle className="text-blue-600" size={28} />
                  <h2 className="text-2xl font-bold text-slate-800">Protocolo de Atención</h2>
                </div>

                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                  {/* Paso 1 */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-blue-500 text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      1
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                      <div className="font-bold text-slate-800 mb-1">Recepción Automática</div>
                      <div className="text-slate-600 text-sm">Chatbot da bienvenida inmediata y acuse de recibo.</div>
                    </div>
                  </div>
                   {/* Paso 2 */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-blue-500 text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      2
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                      <div className="font-bold text-slate-800 mb-1">Clasificación (Triage)</div>
                      <div className="text-slate-600 text-sm">Identificar si es Técnica, Seguridad (Urgente) o General.</div>
                    </div>
                  </div>
                  {/* Paso 3 */}
                   <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-blue-500 text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      3
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                      <div className="font-bold text-slate-800 mb-1">Respuesta Humana</div>
                      <div className="text-slate-600 text-sm">Comunicación empática y resolución en {'<'} 4 horas hábiles.</div>
                    </div>
                  </div>
                </div>
            </div>

            {/* Columna Der: Herramientas & Crisis */}
            <div className="space-y-8">
              {/* Herramientas */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-800 mb-6">Tech Stack de Gestión</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl text-center border border-slate-200">
                    <p className="font-bold text-blue-700">Meta Business Suite</p>
                    <p className="text-xs text-slate-500 mt-1">Moderación FB/IG</p>
                  </div>
                   <div className="p-4 bg-slate-50 rounded-xl text-center border border-slate-200">
                    <p className="font-bold text-slate-700">Hootsuite</p>
                    <p className="text-xs text-slate-500 mt-1">Programación y Escucha</p>
                  </div>
                   <div className="p-4 bg-slate-50 rounded-xl text-center border border-slate-200">
                    <p className="font-bold text-orange-600">HubSpot CRM</p>
                    <p className="text-xs text-slate-500 mt-1">Gestión de Leads/Casos</p>
                  </div>
                   <div className="p-4 bg-slate-50 rounded-xl text-center border border-slate-200">
                    <p className="font-bold text-green-600">WhatsApp Business API</p>
                    <p className="text-xs text-slate-500 mt-1">Soporte Directo</p>
                  </div>
                </div>
              </div>

              {/* Gestión de Crisis (Placeholder basado en recomendación) */}
              <div className="bg-red-50 rounded-2xl p-8 shadow-sm border-l-4 border-red-500">
                 <div className="flex items-center space-x-3 mb-4">
                  <LucideAlertTriangle className="text-red-600" size={24} />
                  <h3 className="text-xl font-bold text-red-800">Gestión de Reputación (Crisis)</h3>
                </div>
                <ul className="space-y-3 text-sm text-red-900">
                  <li className="flex items-start"><CheckCircleOutlined className="mr-2 mt-1"/> <strong>Monitoreo Activo:</strong> Detección temprana de menciones negativas (palabras clave: "estafa", "no funciona", "robo").</li>
                  <li className="flex items-start"><CheckCircleOutlined className="mr-2 mt-1"/> <strong>Protocolo TROLL vs REAL:</strong> Si es spam/troll <ArrowRightOutlined className="mx-1" style={{ fontSize: '0.8em' }} /> Bloquear. Si es queja real <ArrowRightOutlined className="mx-1" style={{ fontSize: '0.8em' }} /> Respuesta pública empática + derivación a canal privado.</li>
                  <li className="flex items-start"><CheckCircleOutlined className="mr-2 mt-1"/> <strong>Transparencia:</strong> Comunicar proactivamente cualquier fallo técnico antes que los usuarios lo reporten masivamente.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* --- SECCIÓN MÉTRICAS (KPIs) --- */}
        {activeTab === 'metricas' && (
          <div className="space-y-8 animate-fadeIn">
             <div className="flex items-center space-x-3 mb-2">
                <BarChartOutlined className="text-blue-600 text-3xl" />
                <h2 className="text-3xl font-bold text-slate-800">Dashboard de KPIs</h2>
              </div>
              <p className="text-slate-600 mb-8 max-w-3xl">
                Medición continua mediante Google Analytics 4 y Hootsuite para asegurar el cumplimiento de los objetivos de negocio y comunicación.
              </p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* KPI 1: Crecimiento de Seguidores (Line/Area Chart) */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-700 mb-4 flex items-center justify-between">
                  Crecimiento de Seguidores
                  <LucideTrendingUp size={18} className="text-green-500"/>
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dataFollowers}>
                      <defs>
                        <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                      <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                      <Area type="monotone" dataKey="seguidores" stroke="#0284c7" fillOpacity={1} fill="url(#colorFollowers)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-slate-500 mt-4 text-center">Objetivo: +85% en 6 meses (Tendencia positiva)</p>
              </div>

              {/* KPI 2: Tasa de Interacción (Pie Chart) */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                 <h3 className="font-bold text-slate-700 mb-4 flex items-center justify-between">
                  Obj. Tasa Interacción (60%)
                  <PieChartOutlined className="text-blue-500"/>
                </h3>
                <div className="h-64 flex items-center justify-center relative">
                   <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dataInteractionTarget}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {dataInteractionTarget.map((_entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#f59e0b' : '#e2e8f0'} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute text-center">
                    <p className="text-3xl font-extrabold text-amber-500">60%</p>
                    <p className="text-xs text-slate-400 uppercase font-semibold">Target</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-4 text-center">Meta en contenidos educativos</p>
              </div>

              {/* KPI 3: Embudo de Conversión (Bar Chart Simple) */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                 <h3 className="font-bold text-slate-700 mb-4 flex items-center justify-between">
                  Tasa de Conversión (Web)
                  <LucideShoppingCart size={18} className="text-purple-500"/>
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dataConversion} layout="vertical" margin={{left: 20}}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#64748b'}} width={100} />
                      <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px'}} />
                      <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]}>
                         {dataConversion.map((_entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : '#94a3b8'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                 <p className="text-xs text-slate-500 mt-4 text-center">Objetivo: 10% de conversión de visita a lead/descarga</p>
              </div>

               {/* Otros KPIs pequeños */}
               <div className="grid grid-cols-2 gap-4 md:col-span-2 xl:col-span-3">
                 <KpiCard icon={LucideShare2} title="Tasa Amplificación" value="15%" subtitle="Compartidos / Total Seguidores" color="indigo" />
                 <KpiCard icon={LucideMousePointerClick} title="CTR Promedio" value="3.2%" subtitle="Clics en enlaces a web" color="cyan" />
               </div>
            </div>
          </div>
        )}

      </main>
      {/* Footer simple */}
      <footer className="bg-slate-800 text-slate-400 py-6 text-center mt-12">
        <p className="text-sm">© 2025 SegurApp Social Media Strategy. Trabajo Final.</p>
      </footer>
    </div>
  );
}