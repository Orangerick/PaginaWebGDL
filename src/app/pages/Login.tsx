import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card';
import { toast } from 'sonner';
import { Lock } from 'lucide-react';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.login({ username, password });
      toast.success('Bienvenido, Administrador');
      navigate('/admin/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-white/10 bg-card/50 backdrop-blur-xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-display font-bold text-white">Panel de Control</CardTitle>
          <p className="text-sm text-gray-500 mt-2">Ingresa tus credenciales para continuar</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-display uppercase tracking-wider text-gray-400">Usuario</label>
              <Input 
                type="text" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="bg-white/5 border-white/10 text-white" 
                placeholder="Nombre de usuario" 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-display uppercase tracking-wider text-gray-400">Contraseña</label>
              <Input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="bg-white/5 border-white/10 text-white" 
                placeholder="••••••••" 
                required 
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold uppercase tracking-wider mt-6"
              disabled={loading}
            >
              {loading ? 'Validando...' : 'Entrar'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center border-t border-white/5 pt-6">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest w-full">Sistema Seguro GDL.DJ</p>
        </CardFooter>
      </Card>
    </div>
  );
};
