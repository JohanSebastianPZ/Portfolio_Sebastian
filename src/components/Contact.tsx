import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import emailjs from 'emailjs-com';

const Contact = () => {
  const sectionRef = useScrollAnimation();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await emailjs.send(
        'service_reb4gv9',
        'template_allkuvh',
        { name: formData.name, email: formData.email, subject: formData.subject, message: formData.message },
        'jOpHaw-DDzWg_OzKB'
      );
      toast({ title: '¡Mensaje enviado!', description: 'Te responderé lo antes posible. ¡Gracias por contactarme!' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast({ title: 'Error al enviar', description: 'No se pudo enviar el mensaje. Intenta más tarde.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: <Mail className="w-6 h-6" />,   iconBg: 'bg-indigo-900/50 text-indigo-300', title: 'Email',     value: 'johansebastian627@gmail.com', link: 'mailto:johansebastian627@gmail.com' },
    { icon: <Phone className="w-6 h-6" />,  iconBg: 'bg-slate-800/60 text-slate-300',   title: 'Teléfono',  value: '+34 611 877 077',             link: 'tel:+34611877077' },
    { icon: <MapPin className="w-6 h-6" />, iconBg: 'bg-indigo-900/50 text-indigo-300', title: 'Ubicación', value: 'Barcelona, España',            link: 'https://maps.google.com/?q=Barcelona,España' },
  ];

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />,   name: 'GitHub',   url: 'https://github.com/JohansebastianPZ',                                                color: 'border-white/10 text-muted-foreground hover:border-indigo-500/40 hover:text-indigo-300' },
    { icon: <Linkedin className="w-5 h-5" />, name: 'LinkedIn', url: 'https://www.linkedin.com/in/johan-sebastian-neiva-martinez-a653b8207/?skipRedirect=true', color: 'border-white/10 text-muted-foreground hover:border-indigo-500/40 hover:text-indigo-300' },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-gradient-to-b from-background to-indigo-950/8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4 fade-in-up">
            <div className="w-12 h-1 bg-gradient-to-r from-indigo-500/60 to-indigo-400/30 rounded-full" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in-up text-gradient">
            Contacto
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto fade-in-up">
            ¿Tienes un proyecto en mente? Me encantaría conocerlo y ayudarte a hacerlo realidad.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <Card className="glass-effect border-indigo-500/15 fade-in-up">
            <CardHeader>
              <CardTitle className="text-2xl">Envíame un mensaje</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Nombre</label>
                    <Input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} required className="bg-background/50 border-white/10 focus:border-indigo-500/50" placeholder="Tu nombre" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required className="bg-background/50 border-white/10 focus:border-indigo-500/50" placeholder="tu@email.com" />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Asunto</label>
                  <Input id="subject" name="subject" type="text" value={formData.subject} onChange={handleInputChange} required className="bg-background/50 border-white/10 focus:border-indigo-500/50" placeholder="Sobre qué quieres hablar" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Mensaje</label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={6} className="bg-background/50 border-white/10 focus:border-indigo-500/50" placeholder="Cuéntame sobre tu proyecto..." />
                </div>

                <Button type="submit" disabled={isSubmitting} size="lg" className="w-full bg-indigo-700 hover:bg-indigo-600 text-white border-0 transition-colors">
                  {isSubmitting ? (
                    <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />Enviando...</>
                  ) : (
                    <><Send className="w-5 h-5 mr-2" />Enviar mensaje</>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="fade-in-up">
              <h3 className="text-2xl font-bold mb-6">Información de contacto</h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${item.iconBg}`}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <a href={item.link} className="text-muted-foreground hover:text-indigo-300 transition-colors text-sm">
                        {item.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="fade-in-up">
              <h3 className="text-2xl font-bold mb-6">Sígueme</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <Button key={index} size="icon" variant="outline" className={`hover:scale-110 transition-all ${social.color}`} onClick={() => window.open(social.url, '_blank')}>
                    {social.icon}
                  </Button>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <div className="fade-in-up">
              <Card className="glass-effect border-white/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Respuesta rápida</h4>
                      <p className="text-sm text-muted-foreground">Típicamente respondo en menos de 2 horas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Call to Action */}
            <div className="fade-in-up">
              <Card className="border-indigo-500/15 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/60 to-slate-950/60" />
                <CardContent className="p-6 relative z-10">
                  <h4 className="text-xl font-bold mb-2">¿Prefieres una llamada?</h4>
                  <p className="text-muted-foreground mb-4">Agenda una reunión de 30 minutos para discutir tu proyecto</p>
                  <Button onClick={() => window.open('https://calendly.com/johansebastian627/30min', '_blank')} className="w-full bg-indigo-700 hover:bg-indigo-600 text-white border-0 transition-colors">
                    Agendar reunión
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
