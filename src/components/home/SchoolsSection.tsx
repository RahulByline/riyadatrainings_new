import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { useInView } from 'react-intersection-observer';
import { apiService } from '../../services/api';
import { Building, Users, MapPin, ChevronRight } from 'lucide-react';
import { LoadingSpinner } from '../LoadingSpinner';

interface School {
  id: string;
  name: string;
  shortname: string;
  description?: string;
  city?: string;
  country?: string;
  logo?: string;
  userCount?: number;
  courseCount?: number;
}

export const SchoolsSection: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        // Mock schools data since IOMAD company API might not be available
        const mockSchools: School[] = [
          {
            id: '1',
            name: 'Al Riyadh International School',
            shortname: 'ARIS',
            description: 'Leading educational institution in Riyadh',
            city: 'Riyadh',
            country: 'Saudi Arabia',
            userCount: 150,
            courseCount: 25
          },
          {
            id: '2',
            name: 'Dubai Modern Academy',
            shortname: 'DMA',
            description: 'Innovation-focused learning environment',
            city: 'Dubai',
            country: 'UAE',
            userCount: 200,
            courseCount: 30
          },
          {
            id: '3',
            name: 'Jeddah Excellence School',
            shortname: 'JES',
            description: 'Excellence in education and character building',
            city: 'Jeddah',
            country: 'Saudi Arabia',
            userCount: 120,
            courseCount: 20
          },
          {
            id: '4',
            name: 'Abu Dhabi Future School',
            shortname: 'ADFS',
            description: 'Preparing students for the future',
            city: 'Abu Dhabi',
            country: 'UAE',
            userCount: 180,
            courseCount: 28
          }
        ];
        
        setSchools(mockSchools);
      } catch (error) {
        console.error('Error fetching schools:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  return (
    <section id="schools" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className={`text-center mb-16 ${isRTL ? 'text-right' : 'text-left'}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('partneredSchools')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('schoolsSubtitle')}
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner size="lg" />
            <span className="ml-4 text-gray-600 dark:text-gray-300">Loading schools...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {schools.map((school, index) => (
              <motion.div
                key={school.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
              >
                {/* School Logo/Header */}
                <div className="relative h-32 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {school.logo ? (
                      <img
                        src={school.logo}
                        alt={school.name}
                        className="w-16 h-16 object-contain"
                      />
                    ) : (
                      <Building className="w-16 h-16 text-white opacity-80" />
                    )}
                  </div>
                  
                  {/* Country Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white bg-opacity-90 text-xs font-medium rounded-full text-gray-800">
                      {school.country}
                    </span>
                  </div>
                </div>

                {/* School Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {school.name}
                  </h3>
                  
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3">
                    {school.shortname}
                  </p>
                  
                  {school.description && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {school.description}
                    </p>
                  )}

                  {/* Location */}
                  {school.city && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{school.city}</span>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {school.userCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {school.courseCount}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <motion.div
                    whileHover={{ x: isRTL ? -5 : 5 }}
                    className="flex items-center justify-between text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors"
                  >
                    <span className="text-sm font-medium">View School</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 px-8 py-4 rounded-full font-semibold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-300"
          >
            View All Schools
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};