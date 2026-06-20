import { useNavigate } from 'react-router-dom';
import { useCourse } from '../store/CourseContext';

const ICONS: Record<string, string> = {
  statistics: '📊',
  networks: '🌐',
};

export default function CoursePlaceholder() {
  const { course, setCourse } = useCourse();
  const navigate = useNavigate();
  const icon = ICONS[course.id] ?? '📚';

  function goToMaths() {
    setCourse('maths');
    navigate('/');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="text-5xl mb-4">{icon}</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{course.label}</h2>
      <p className="text-gray-500 max-w-sm">
        This course is coming soon. Switch back to{' '}
        <button
          onClick={goToMaths}
          className="font-medium text-amber-600 hover:text-amber-500 underline"
        >
          Maths
        </button>.
      </p>
    </div>
  );
}
