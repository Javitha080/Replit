import React from 'react';
import BentoGrid from './BentoGrid';

const SchoolPrograms = () => {
  // Programs offered by the school in Bento Grid layout
  const programs = [
    {
      title: "Academic Excellence",
      description: "Rigorous curriculum aligned with national standards, with emphasis on critical thinking and practical applications.",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500",
      size: "large",
      color: "#4f46e5"
    },
    {
      title: "STEM Program",
      description: "Specialized science, technology, engineering, and mathematics program with hands-on learning.",
      image: "https://images.unsplash.com/photo-1543273111-e62c2a8869f5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500",
      size: "medium",
      color: "#06b6d4"
    },
    {
      title: "Arts & Culture",
      description: "Comprehensive arts education including visual arts, music, drama, and traditional cultural programs.",
      image: "https://images.unsplash.com/photo-1526285759904-71d1170ed2ac?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500",
      size: "small",
      color: "#ec4899"
    },
    {
      title: "Sports Academy",
      description: "Competitive sports programs with professional coaching in cricket, volleyball, track and field, and swimming.",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500",
      size: "small",
      color: "#22c55e"
    },
    {
      title: "Leadership Development",
      description: "Student council, prefect system, and community service initiatives to build leadership skills.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500",
      size: "medium",
      color: "#f59e0b"
    }
  ];

  return (
    <section id="programs" className="relative">
      <BentoGrid
        title="Academic Programs"
        subtitle="Our school offers a wide range of academic and extracurricular programs designed to nurture well-rounded individuals ready for the challenges of the future."
        items={programs.map(program => ({
          title: program.title,
          description: program.description,
          image: program.image,
          size: program.size as 'small' | 'medium' | 'large',
          color: program.color,
          href: "#"
        }))}
      />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent opacity-30"></div>
      <div className="absolute bottom-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent opacity-30"></div>
    </section>
  );
};

export default SchoolPrograms;