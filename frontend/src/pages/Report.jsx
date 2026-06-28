import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout';
import { ReportDisplay } from '../components/report/ReportDisplay';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const Report = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { report, story } = location.state || {};
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!report) {
      navigate('/');
      return;
    }
  }, [report, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center py-20">
          <LoadingSpinner text="Generating report..." />
        </div>
      </Layout>
    );
  }

  if (!report) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No report available</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8">
        <ReportDisplay report={report} story={story} />
      </div>
    </Layout>
  );
};
