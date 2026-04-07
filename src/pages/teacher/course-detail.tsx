import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCourseStore } from '../../store';
import { Button } from '../../components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUsers, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

export const TeacherCourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { courses, updateCourse, deleteCourse } = useCourseStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');

  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div style={{ padding: '32px', textAlign: 'center' }}>
        <h1>Course Not Found</h1>
        <p>The course you're looking for doesn't exist.</p>
        <Link to="/teacher/courses">
          <Button variant="primary">Back to Courses</Button>
        </Link>
      </div>
    );
  }

  const handleSave = () => {
    if (editName.trim()) {
      updateCourse(course.id, {
        name: editName,
        description: editDesc
      });
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      deleteCourse(course.id);
      navigate('/teacher/courses');
    }
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <Link to="/teacher/courses">
          <Button variant="ghost">
            <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '8px' }} />
            Back to Courses
          </Button>
        </Link>
        <div style={{ flex: 1 }}>
          {isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                style={{ fontSize: '28px', fontWeight: 700, border: '1px solid var(--color-gray-300)', borderRadius: '8px', padding: '8px 12px' }}
                value={editName}
                onChange={e => setEditName(e.target.value)}
                placeholder="Course Name"
              />
              <textarea
                style={{ border: '1px solid var(--color-gray-300)', borderRadius: '8px', padding: '8px 12px', minHeight: '60px' }}
                value={editDesc}
                onChange={e => setEditDesc(e.target.value)}
                placeholder="Course Description"
              />
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button variant="primary" onClick={handleSave}>Save Changes</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <>
              <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>{course.name}</h1>
              <p style={{ color: 'var(--color-gray-500)' }}>{course.description}</p>
            </>
          )}
        </div>
        {!isEditing && (
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="outline" onClick={() => {
              setIsEditing(true);
              setEditName(course.name);
              setEditDesc(course.description);
            }}>
              Edit Course
            </Button>
            <Button variant="outline" style={{ color: 'var(--color-error)' }} onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} style={{ marginRight: '8px' }} />
              Delete Course
            </Button>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <FontAwesomeIcon icon={faUsers} style={{ fontSize: '24px', color: 'var(--color-primary)' }} />
            <h2 style={{ fontSize: '20px', fontWeight: 600 }}>Enrolled Students</h2>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>{course.studentIds.length}</div>
          <p style={{ color: 'var(--color-gray-500)' }}>Students enrolled in this course</p>
        </div>

        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <FontAwesomeIcon icon={faPlus} style={{ fontSize: '24px', color: 'var(--color-success)' }} />
            <h2 style={{ fontSize: '20px', fontWeight: 600 }}>Course Actions</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Button variant="outline" fullWidth>
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />
              Add Students
            </Button>
            <Button variant="outline" fullWidth>
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />
              Create Assignment
            </Button>
            <Button variant="outline" fullWidth>
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />
              Add Learning Material
            </Button>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>Course Information</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '14px', color: 'var(--color-gray-500)', marginBottom: '4px' }}>Course ID</div>
            <div style={{ fontWeight: 600 }}>{course.id}</div>
          </div>
          <div>
            <div style={{ fontSize: '14px', color: 'var(--color-gray-500)', marginBottom: '4px' }}>Created</div>
            <div style={{ fontWeight: 600 }}>{new Date(course.createdAt).toLocaleDateString()}</div>
          </div>
          <div>
            <div style={{ fontSize: '14px', color: 'var(--color-gray-500)', marginBottom: '4px' }}>Theme Color</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: course.themeColor }}></div>
              <span style={{ fontWeight: 600 }}>{course.themeColor}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};