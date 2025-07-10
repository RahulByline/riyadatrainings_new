import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { 
  Search, 
  Building, 
  Users, 
  MapPin, 
  Plus,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

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
  status: 'active' | 'inactive';
}

export const SchoolsPage: React.FC = () => {
  const { t } = useTranslation();
  const [schools, setSchools] = useState<School[]>([]);
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        // Mock schools data
        const mockSchools: School[] = [
          {
            id: '1',
            name: 'Al Riyadh International School',
            shortname: 'ARIS',
            description: 'Leading educational institution in Riyadh',
            city: 'Riyadh',
            country: 'Saudi Arabia',
            userCount: 150,
            courseCount: 25,
            status: 'active'
          },
          {
            id: '2',
            name: 'Dubai Modern Academy',
            shortname: 'DMA',
            description: 'Innovation-focused learning environment',
            city: 'Dubai',
            country: 'UAE',
            userCount: 200,
            courseCount: 30,
            status: 'active'
          },
          {
            id: '3',
            name: 'Jeddah Excellence School',
            shortname: 'JES',
            description: 'Excellence in education and character building',
            city: 'Jeddah',
            country: 'Saudi Arabia',
            userCount: 120,
            courseCount: 20,
            status: 'active'
          },
          {
            id: '4',
            name: 'Abu Dhabi Future School',
            shortname: 'ADFS',
            description: 'Preparing students for the future',
            city: 'Abu Dhabi',
            country: 'UAE',
            userCount: 180,
            courseCount: 28,
            status: 'inactive'
          }
        ];
        
        setSchools(mockSchools);
        setFilteredSchools(mockSchools);
      } catch (error) {
        console.error('Error fetching schools:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  useEffect(() => {
    const filtered = schools.filter(school =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.shortname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.city?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSchools(filtered);
  }, [schools, searchTerm]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-96">
          <LoadingSpinner size="lg" />
          <span className="ml-4 text-gray-600 dark:text-gray-300">Loading schools...</span>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Schools Management
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Manage and monitor all partnered schools
            </p>
          </div>
          
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Plus className="w-4 h-4" />
            Add School
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search schools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={Search}
              />
            </div>
          </div>
        </div>

        {/* Schools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.map((school, index) => (
            <motion.div
              key={school.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* School Header */}
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
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    school.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {school.status}
                  </span>
                </div>
              </div>

              {/* School Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
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
                    <span>{school.city}, {school.country}</span>
                  </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {school.userCount}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Users</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {school.courseCount}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Courses</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="flex-1">
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSchools.length === 0 && (
          <div className="text-center py-12">
            <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No schools found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search criteria or add a new school
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};