import React, { useState, useEffect } from 'react';
import { MessageCircle, Star, Send, User } from 'lucide-react';

interface Comment {
  id: number;
  name: string;
  email: string;
  message: string;
  rating: number;
  timestamp: string;
}

const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    message: '',
    rating: 5
  });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch comments from backend
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/comments');
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.name || !newComment.message) return;

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });

      if (response.ok) {
        const savedComment = await response.json();
        setComments([savedComment, ...comments]);
        setNewComment({ name: '', email: '', message: '', rating: 5 });
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={20}
        className={`${
          index < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
        onClick={() => interactive && onRate && onRate(index + 1)}
      />
    ));
  };

  return (
    <section id="comments" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <MessageCircle className="inline mr-3" size={40} />
            Comentarios y <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Testimonios</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Deja tu opinión y conoce lo que otros dicen sobre mi trabajo
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Comment Form */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Deja un comentario
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    required
                    value={newComment.name}
                    onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newComment.email}
                    onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Calificación
                </label>
                <div className="flex space-x-1">
                  {renderStars(newComment.rating, true, (rating) => 
                    setNewComment({ ...newComment, rating })
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje *
                </label>
                <textarea
                  required
                  rows={4}
                  value={newComment.message}
                  onChange={(e) => setNewComment({ ...newComment, message: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Comparte tu experiencia..."
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Send size={20} />
                    Enviar Comentario
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Comentarios ({comments.length})
            </h3>
            {comments.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
                <p>Aún no hay comentarios. ¡Sé el primero en comentar!</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center">
                        <User className="text-white" size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{comment.name}</h4>
                          <div className="flex items-center gap-1">
                            {renderStars(comment.rating)}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-2">{comment.message}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(comment.timestamp).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comments;