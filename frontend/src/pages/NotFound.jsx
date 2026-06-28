import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiArrowLeft } from 'react-icons/fi';
import { Layout } from '../components/layout';
import { Button } from '../components/common/Button';

export const NotFound = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-bubble-primary mb-4">404</h1>
          <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Page Not Found</p>
          <p className="text-lg text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist. 😅
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/">
            <Button variant="primary" size="lg" icon={FiHome}>
              Go Home
            </Button>
          </Link>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            icon={FiArrowLeft}
          >
            Go Back
          </Button>
        </motion.div>
      </div>
    </Layout>
  );
};
