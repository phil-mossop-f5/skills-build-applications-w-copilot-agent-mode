import { Link, Navigate, NavLink, Route, Routes } from 'react-router-dom';
import logo from '../../../docs/octofitapp-small.png';
import { apiBaseUrl } from './api';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const sections = [
  { path: '/activities', label: 'Activities', number: '01' },
  { path: '/leaderboard', label: 'Leaderboard', number: '02' },
  { path: '/teams', label: 'Teams', number: '03' },
  { path: '/users', label: 'Athletes', number: '04' },
  { path: '/workouts', label: 'Workouts', number: '05' },
];

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand-lockup" to="/activities" aria-label="OctoFit Tracker home">
          <img src={logo} alt="" />
          <span>
            <strong>octofit</strong>
            <small>TRACKER</small>
          </span>
        </Link>

        <div className="sidebar-section-label">MERGINGTON HIGH</div>
        <nav className="section-nav" aria-label="Main navigation">
          {sections.map((section) => (
            <NavLink
              className={({ isActive }) => `section-link${isActive ? ' active' : ''}`}
              key={section.path}
              to={section.path}
            >
              <span className="section-number">{section.number}</span>
              <span>{section.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className="season-mark">26</span>
          <span>
            <strong>Fall season</strong>
            <small>Move well. Move together.</small>
          </span>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div className="topbar-context">
            <span className="live-mark" aria-hidden="true" />
            <span>FITNESS PROGRAM</span>
            <span className="context-divider">/</span>
            <span>STUDENT TRACKER</span>
          </div>
          <div className="api-target" title="API base URL">
            <span>API</span>
            <code>{new URL(apiBaseUrl).host}</code>
          </div>
        </header>

        <div className="route-content">
          <Routes>
            <Route path="/" element={<Navigate replace to="/activities" />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate replace to="/activities" />} />
          </Routes>
        </div>

        <footer className="app-footer">
          <span>OCTOFIT TRACKER</span>
          <span>MERGINGTON HIGH · 2026</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
