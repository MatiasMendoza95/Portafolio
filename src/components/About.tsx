import React from 'react';
import { Code, Database, Server, Smartphone } from 'lucide-react';

const About: React.FC = () => {
  const highlights = [
    {
      Icon: Code,
      title: 'Frontend Development',
      description: 'React, TypeScript, HTML5, CSS3'
    },
    {
      Icon: Server,
      title: 'Backend Development',
      description: 'Node.js, Express, APIs RESTful'
    },
    {
      Icon: Database,
      title: 'Base de Datos',
      description: 'MySQL, PostgreSQL, MongoDB'
    },
    {
      Icon: Smartphone,
      title: 'Responsive Design',
      description: 'Mobile-first, UI/UX moderno'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sobre <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Mí</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Analista Programador apasionado por la tecnología y el desarrollo de software
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="prose prose-lg">
              <p className="text-gray-700 leading-relaxed">
                Soy un desarrollador con más de 3 años de experiencia en el desarrollo 
                de aplicaciones web y móviles. Me especializo en crear soluciones 
                digitales que no solo funcionan perfectamente, sino que también 
                brindan una experiencia excepcional al usuario.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Mi enfoque se basa en escribir código limpio, mantenible y escalable, 
                utilizando las mejores prácticas de la industria. Siempre estoy 
                aprendiendo nuevas tecnologías para mantenerme actualizado en este 
                campo en constante evolución.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                "La tecnología es mejor cuando acerca a las personas"
              </h3>
              <p className="text-gray-600">
                - Mi filosofía de desarrollo
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map(({ Icon, title, description }, index) => (
              <div
                key={title}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;