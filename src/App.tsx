import React, { useState, useEffect } from 'react';
import { PageView, ServiceCategory } from './types';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { CompanyIntroSection } from './components/CompanyIntroSection';
import { CoreServicesSection } from './components/CoreServicesSection';
import { SingaporeFocusGallery } from './components/SingaporeFocusGallery';
import { CustomOperationSection } from './components/CustomOperationSection';
import { PrinciplesSection } from './components/PrinciplesSection';
import { ProcessTimelineSection } from './components/ProcessTimelineSection';
import { TargetPartnersSection } from './components/TargetPartnersSection';
import { ConsultationFormSection } from './components/ConsultationFormSection';
import { FloatingContactDock } from './components/FloatingContactDock';
import { DetailModal } from './components/DetailModal';
import { AdminPortal } from './components/AdminPortal';
import { Footer } from './components/Footer';
import { AboutView, StudentView, MiceView, InstitutionView, ServicesView } from './components/SubPageViews';

export default function App() {
  const [activeView, setActiveView] = useState<PageView>('home');
  const [selectedService, setSelectedService] = useState<ServiceCategory | null>(null);
  const [initialInquiryType, setInitialInquiryType] = useState<string>('');
  const [adminInquiryId, setAdminInquiryId] = useState<string | null>(null);

  // Sync route with URL query param if `/admin` or `?inquiryId=` is present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const path = window.location.pathname;
    
    if (path === '/admin' || params.has('admin') || params.has('inquiryId')) {
      setActiveView('admin');
      if (params.has('inquiryId')) {
        setAdminInquiryId(params.get('inquiryId'));
      }
    }
  }, []);

  const handleNavigate = (view: PageView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenInquiry = (inquiryType: string = '') => {
    setInitialInquiryType(inquiryType);
    if (activeView === 'home') {
      const formEl = document.getElementById('inquiry-section');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        setActiveView('inquiry');
      }
    } else {
      setActiveView('inquiry');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-amber-400 selection:text-slate-950 font-sans">
      
      {/* Top Header Navigation */}
      <Header
        activeView={activeView}
        onNavigate={handleNavigate}
        onOpenInquiry={() => handleOpenInquiry('맞춤 일정 및 견적')}
      />

      {/* Main View Router */}
      <main>
        {activeView === 'home' && (
          <div className="space-y-0">
            {/* 1. Grand Hero Carousel */}
            <HeroSlider
              onNavigate={handleNavigate}
              onOpenInquiry={() => handleOpenInquiry('맞춤 일정 및 견적')}
            />

            {/* 2. Company Introduction */}
            <CompanyIntroSection
              onOpenInquiry={() => handleOpenInquiry('B2B 현지 운영 파트너십')}
            />

            {/* 3. Core B2B Services (3 Big Hero Cards) */}
            <CoreServicesSection
              onSelectService={(service) => setSelectedService(service)}
              onOpenInquiry={(type) => handleOpenInquiry(type)}
              onNavigate={handleNavigate}
            />

            {/* 4. Singapore Focus Gallery & Hubs */}
            <SingaporeFocusGallery />

            {/* 5. Custom Local Operation Services */}
            <CustomOperationSection
              onOpenInquiry={() => handleOpenInquiry('맞춤 수배')}
            />

            {/* 6. Operational Principles */}
            <PrinciplesSection />

            {/* 7. 7-Step Operational Timeline */}
            <ProcessTimelineSection
              onOpenInquiry={() => handleOpenInquiry('맞춤 일정 및 견적')}
            />

            {/* 8. Target B2B Partners */}
            <TargetPartnersSection />

            {/* 9. Comprehensive B2B Consultation Inquiry Form */}
            <ConsultationFormSection
              initialInquiryType={initialInquiryType}
            />

            {/* Sticky Floating Dock */}
            <FloatingContactDock
              onOpenInquiry={() => handleOpenInquiry('맞춤 일정 및 견적')}
            />
          </div>
        )}

        {/* Subpages */}
        {activeView === 'about' && (
          <AboutView onOpenInquiry={handleOpenInquiry} onNavigate={handleNavigate} />
        )}

        {activeView === 'student' && (
          <StudentView onOpenInquiry={handleOpenInquiry} onNavigate={handleNavigate} />
        )}

        {activeView === 'mice' && (
          <MiceView onOpenInquiry={handleOpenInquiry} onNavigate={handleNavigate} />
        )}

        {activeView === 'institution' && (
          <InstitutionView onOpenInquiry={handleOpenInquiry} onNavigate={handleNavigate} />
        )}

        {activeView === 'services' && (
          <ServicesView onOpenInquiry={handleOpenInquiry} onNavigate={handleNavigate} />
        )}

        {activeView === 'inquiry' && (
          <div className="pt-28 pb-20">
            <ConsultationFormSection
              initialInquiryType={initialInquiryType}
            />
          </div>
        )}

        {activeView === 'admin' && (
          <AdminPortal
            onBackToHome={() => handleNavigate('home')}
            selectedInquiryId={adminInquiryId}
          />
        )}
      </main>

      {/* Service Detail Modal */}
      <DetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onOpenInquiry={(type) => handleOpenInquiry(type)}
      />

      {/* Corporate B2B Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenInquiry={() => handleOpenInquiry('맞춤 일정 및 견적')}
      />

    </div>
  );
}
