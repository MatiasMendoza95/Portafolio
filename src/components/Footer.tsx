import React from 'react';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { Icon: Github, href: 'https://github.com/tu-usuario', label: 'GitHub' },
    { Icon: Linkedin, href: 'https://linkedin.com/in/tu-perfil', label: 'LinkedIn' },
    { Icon: Twitter, href: 'https://twitter.com/tu-usuario', label: 'Twitter' },
    { Icon: Mail, href: 'mailto:tu-email@ejemplo.com', label: 'Email' }
  ];

  const quickLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Sobre Mí', href: '#about' },
    { name: 'Habilidades', href: '#skills' },
    { name: 'Contacto', href: '#contact' }
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Dev.Mendo 
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Analista Programador especializado en desarrollo web moderno. 
              Creando soluciones digitales innovadoras.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Desarrollo Web</li>
              <li>Aplicaciones Móviles</li>
              <li>Consultoría Técnica</li>
              <li>Mantenimiento de Software</li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-2 text-sm text-gray-300 mb-4">
              <p>tu-email@ejemplo.com</p>
              <p>+56 9 1234 5678</p>
              <p>Santiago, Chile</p>
            </div>
            <div className="flex space-x-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 py-6 text-center">
          <p className="text-sm text-gray-300 flex items-center justify-center gap-1">
            © 2024 Dev.Portfolio. Hecho con{' '}
            <Heart className="text-red-400 fill-current" size={16} />{' '}
            por un Analista Programador
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;