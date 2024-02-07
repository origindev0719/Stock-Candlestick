import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/styles.css"
import { LoginPage } from "./pages/login/LoginPage";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { SportsPage } from "./pages/sports/SportsPage";
import { TeamView } from "./pages/sports/components/TeamView";
import { LoginForm } from "./pages/login/components/LoginForm";
import { RegisterPage } from "./pages/register/RegisterPage";
import { CodeVerificationForm } from "./pages/login/components/CodeVerificationForm";
import { FeedPage } from "./pages/feed/FeedPage";
import { GameSchedulePage } from "./pages/gameSchedule/GameSchedulePage";
import { PropBetsPage } from "./pages/propBets/PropBetsPage";
import { EvChartPage } from "./pages/evChart/EvChartPage";
import { PlayerInfoView } from "./pages/sports/components/PlayerInfoView";
import { StocksPage } from "./pages/stocks/StocksPage";
import { IndividualView } from "./pages/stocks/components/IndividualStocksView";
import { CompareStocksView } from "./pages/stocks/components/CompareStocksView";
import { CryptoPage } from "./pages/crypto/CryptoPage";
import { IndividualCryptoView } from "./pages/crypto/components/IndividualCryptoView";
import { InboxPage } from "./pages/inbox/InboxPage";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { SelectPropBetsPage } from "./pages/propBets/components/SelectPropBets";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} exact />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verification" element={<CodeVerificationForm />} />
        <Route path="/dashboard/:id" element={<DashboardPage />} />
        <Route path="/sports" element={<SportsPage />} />
        <Route path="/sports/team/:id" element={<TeamView />} />
        <Route path="/sports/playerInfo/:id" element={<PlayerInfoView />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/sports/gameSchedule/:id" element={<GameSchedulePage />} />
        <Route path="/sports/propBets/:id" element={<PropBetsPage />} />
        <Route path="/sports/selectPropBets" element={<SelectPropBetsPage />} />
        <Route path="/sports/evChart" element={<EvChartPage />} />
        <Route path="/stocks" element={<StocksPage />} />
        <Route path="/stocks/individualStocks/:id" element={<IndividualView />} />
        <Route path="/stocks/individualStocks/:id/compareStocks" element={<CompareStocksView />} />
        <Route path="/crypto" element={<CryptoPage />} />
        <Route path="/crypto/individualCrypto/:id" element={<IndividualCryptoView />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;