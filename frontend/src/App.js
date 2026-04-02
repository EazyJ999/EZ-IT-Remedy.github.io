import { useState } from "react";
import "@/App.css";
import axios from "axios";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Monitor, HardDrive, Cloud, Smartphone, Clock, MapPin, Phone, Mail, CheckCircle2, Shield, Zap, Server, Cpu, Database } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    service_type: "",
    preferred_date: "",
    preferred_time: "",
    message: ""
  });

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const services = [
    {
      icon: <HardDrive className="w-12 h-12" />,
      title: "Data Recovery",
      description: "Lost files? We recover data from failed drives, corrupted systems, and accidental deletions.",
      price: "From R99",
      highlight: "No recovery = No pay"
    },
    {
      icon: <Monitor className="w-12 h-12" />,
      title: "Computer Repair",
      description: "Hardware failures, virus removal, system optimization, and complete diagnostics.",
      price: "From R79"
    },
    {
      icon: <Cloud className="w-12 h-12" />,
      title: "Remote Support",
      description: "Fast remote assistance for software issues, troubleshooting, and technical guidance.",
      price: "From R49"
    },
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: "On-Site Service",
      description: "We come to you! Home or office visits for setup, repairs, and installations.",
      price: "From R89"
    }
  ];

  const hostingPlans = {
    shared: [
      { name: "Basic (Starter)", price: "R40" },
      { name: "Advanced (Business)", price: "R49" },
      { name: "Value (Corporate)", price: "R160" },
      { name: "Premier (Enterprise)", price: "R190" }
    ],
    vps: [
      { name: "KVM 4", specs: "4GB RAM", price: "R14.50" },
      { name: "KVM 8", specs: "8GB RAM", price: "R29" },
      { name: "KVM 16", specs: "16GB RAM", price: "R58" },
      { name: "KVM 32", specs: "32GB RAM", price: "R115" },
      { name: "vBox 4 (OVZ)", specs: "4GB RAM", price: "R14.50" },
      { name: "vBox 8 (OVZ)", specs: "8GB RAM", price: "R29" },
      { name: "vBox 16 (OVZ)", specs: "16GB RAM", price: "R58" }
    ],
    semiDedicated: [
      { name: "Semi Pro", specs: "Semi Dedicated 1", price: "R20" },
      { name: "Semi Expert", specs: "Semi Dedicated 2", price: "R30" }
    ],
    dedicated: [
      { name: "Xeon E3 v3", price: "R60" },
      { name: "Xeon E3 v5", price: "R76" },
      { name: "Xeon O", price: "R93" },
      { name: "Xeon E5 2620 v3", price: "R103" },
      { name: "Xeon Scalable 6c", price: "R113" },
      { name: "Xeon E5 2630L v4", price: "R119" },
      { name: "Xeon E5 2650L v4", price: "R143" },
      { name: "Xeon Scalable 8c", price: "R143" },
      { name: "Xeon Scalable 10c", price: "R159" },
      { name: "Xeon Scalable 16c", price: "R186" },
      { name: "Xeon Scalable 24c", price: "R243" },
      { name: "Xeon Scalable 48c", price: "R329" },
      { name: "AMD Epyc 64c", price: "R383" }
    ]
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/appointments`, bookingForm);
      toast({
        title: "Appointment Booked!",
        description: "We'll contact you shortly to confirm your appointment.",
      });
      setBookingOpen(false);
      setBookingForm({
        name: "",
        email: "",
        phone: "",
        service_type: "",
        preferred_date: "",
        preferred_time: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book appointment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/contact`, contactForm);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setContactOpen(false);
      setContactForm({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      {/* Hero Section */}
      <section className="hero-section" data-testid="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white" data-testid="hero-title">
              EZ IT Remedy
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-cyan-100">
              Your Local IT Specialist
            </p>
            <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-3xl mx-auto">
              Over 7 years of experience helping individuals and small businesses with data recovery, 
              computer repairs, and reliable IT support.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-cyan-500 hover:bg-cyan-600 text-white text-lg px-8 py-6"
                onClick={() => setBookingOpen(true)}
                data-testid="book-appointment-hero-btn"
              >
                Book Appointment
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 text-lg px-8 py-6"
                onClick={() => setContactOpen(true)}
                data-testid="contact-hero-btn"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-900" data-testid="why-choose-section">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Why Choose EZ IT Remedy?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-gray-800 rounded-lg border border-cyan-500/20">
              <CheckCircle2 className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Local & Reliable</h3>
              <p className="text-gray-300">Based in your area. We show up when we say we will.</p>
            </div>
            <div className="text-center p-6 bg-gray-800 rounded-lg border border-cyan-500/20">
              <Shield className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">7+ Years Experience</h3>
              <p className="text-gray-300">Trusted by individuals and businesses for all IT needs.</p>
            </div>
            <div className="text-center p-6 bg-gray-800 rounded-lg border border-cyan-500/20">
              <Zap className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">No Recovery, No Pay</h3>
              <p className="text-gray-300">Can't recover your data? You don't pay for the diagnostic.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950" data-testid="services-section">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">Our Services</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            On-site support, remote assistance, or convenient pick-up and drop-off service
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="service-card group"
                data-testid={`service-card-${index}`}
              >
                <div className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                <p className="text-gray-300 mb-4 text-sm">{service.description}</p>
                <div className="mt-auto">
                  <p className="text-cyan-400 font-bold text-lg">{service.price}</p>
                  {service.highlight && (
                    <p className="text-green-400 text-sm mt-2 font-semibold">{service.highlight}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Web Hosting Services Section */}
      <section className="py-20 bg-gray-950" data-testid="hosting-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Server className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4 text-white">Web Hosting Services</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Professional hosting solutions for your website - from shared hosting to dedicated servers
            </p>
          </div>

          <Tabs defaultValue="shared" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800 mb-8" data-testid="hosting-tabs">
              <TabsTrigger value="shared" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                Shared Hosting
              </TabsTrigger>
              <TabsTrigger value="vps" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                VPS Servers
              </TabsTrigger>
              <TabsTrigger value="semi" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                Semi-Dedicated
              </TabsTrigger>
              <TabsTrigger value="dedicated" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                Dedicated Servers
              </TabsTrigger>
            </TabsList>

            {/* Shared Hosting */}
            <TabsContent value="shared" className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {hostingPlans.shared.map((plan, index) => (
                  <div key={index} className="bg-gray-800 p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:transform hover:scale-105">
                    <Database className="w-10 h-10 text-cyan-400 mb-3" />
                    <h3 className="text-lg font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-3xl font-bold text-cyan-400 mb-4">{plan.price}<span className="text-sm text-gray-400">/mo</span></p>
                    <Button 
                      className="w-full bg-cyan-500 hover:bg-cyan-600"
                      onClick={() => setBookingOpen(true)}
                      data-testid={`hosting-order-btn-${index}`}
                    >
                      Order Now
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* VPS Servers */}
            <TabsContent value="vps" className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hostingPlans.vps.map((plan, index) => (
                  <div key={index} className="bg-gray-800 p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:transform hover:scale-105">
                    <Cpu className="w-10 h-10 text-cyan-400 mb-3" />
                    <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                    <p className="text-sm text-gray-400 mb-3">{plan.specs}</p>
                    <p className="text-3xl font-bold text-cyan-400 mb-4">{plan.price}<span className="text-sm text-gray-400">/mo</span></p>
                    <Button 
                      className="w-full bg-cyan-500 hover:bg-cyan-600"
                      onClick={() => setBookingOpen(true)}
                      data-testid={`vps-order-btn-${index}`}
                    >
                      Order Now
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Semi-Dedicated */}
            <TabsContent value="semi" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {hostingPlans.semiDedicated.map((plan, index) => (
                  <div key={index} className="bg-gray-800 p-8 rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:transform hover:scale-105">
                    <Server className="w-12 h-12 text-cyan-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                    <p className="text-sm text-gray-400 mb-4">{plan.specs}</p>
                    <p className="text-4xl font-bold text-cyan-400 mb-6">{plan.price}<span className="text-sm text-gray-400">/mo</span></p>
                    <Button 
                      className="w-full bg-cyan-500 hover:bg-cyan-600"
                      onClick={() => setBookingOpen(true)}
                      data-testid={`semi-order-btn-${index}`}
                    >
                      Order Now
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Dedicated Servers */}
            <TabsContent value="dedicated" className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hostingPlans.dedicated.map((plan, index) => (
                  <div key={index} className="bg-gray-800 p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:transform hover:scale-105">
                    <Server className="w-10 h-10 text-cyan-400 mb-3" />
                    <h3 className="text-lg font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-3xl font-bold text-cyan-400 mb-4">{plan.price}<span className="text-sm text-gray-400">/mo</span></p>
                    <Button 
                      className="w-full bg-cyan-500 hover:bg-cyan-600"
                      onClick={() => setBookingOpen(true)}
                      data-testid={`dedicated-order-btn-${index}`}
                    >
                      Order Now
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-12">
            <p className="text-gray-400 mb-4">Need help choosing the right hosting plan?</p>
            <Button 
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-600"
              onClick={() => setContactOpen(true)}
              data-testid="hosting-contact-btn"
            >
              Contact Us for Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-gray-900" data-testid="contact-info-section">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Get In Touch</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <Phone className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Call Us</h3>
              <a href="tel:0625825484" className="text-cyan-400 hover:text-cyan-300">
                062 582 5484
              </a>
            </div>
            <div className="text-center p-6">
              <Clock className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Hours</h3>
              <p className="text-gray-300">Opens 5:30 PM Thu</p>
              <p className="text-sm text-gray-400 mt-1">Call for current hours</p>
            </div>
            <div className="text-center p-6">
              <MapPin className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Service Area</h3>
              <p className="text-gray-300">Local IT Specialist</p>
              <p className="text-sm text-gray-400 mt-1">On-site & Remote</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-cyan-500 hover:bg-cyan-600 text-white"
              onClick={() => setBookingOpen(true)}
              data-testid="book-appointment-contact-btn"
            >
              Book Your Appointment Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 py-8 border-t border-cyan-500/20" data-testid="footer">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 mb-2">
            © 2025 EZ IT Remedy - Computer Support & Services
          </p>
          <p className="text-sm text-gray-500">
            Local IT Specialist | 7+ Years Experience | No Recovery = No Pay Guarantee
          </p>
        </div>
      </footer>

      {/* Booking Modal */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="sm:max-w-md bg-gray-900 border-cyan-500/30" data-testid="booking-modal">
          <DialogHeader>
            <DialogTitle className="text-white">Book an Appointment</DialogTitle>
            <DialogDescription className="text-gray-400">
              Fill out the form below and we'll contact you to confirm.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div>
              <Label htmlFor="booking-name" className="text-white">Name *</Label>
              <Input 
                id="booking-name"
                data-testid="booking-name-input"
                required
                value={bookingForm.name}
                onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="booking-email" className="text-white">Email *</Label>
              <Input 
                id="booking-email"
                data-testid="booking-email-input"
                type="email"
                required
                value={bookingForm.email}
                onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="booking-phone" className="text-white">Phone *</Label>
              <Input 
                id="booking-phone"
                data-testid="booking-phone-input"
                required
                value={bookingForm.phone}
                onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="booking-service" className="text-white">Service Type *</Label>
              <Select 
                required
                value={bookingForm.service_type}
                onValueChange={(value) => setBookingForm({...bookingForm, service_type: value})}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white" data-testid="booking-service-select">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="data-recovery">Data Recovery</SelectItem>
                  <SelectItem value="computer-repair">Computer Repair</SelectItem>
                  <SelectItem value="remote-support">Remote Support</SelectItem>
                  <SelectItem value="onsite-service">On-Site Service</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="booking-date" className="text-white">Preferred Date *</Label>
                <Input 
                  id="booking-date"
                  data-testid="booking-date-input"
                  type="date"
                  required
                  value={bookingForm.preferred_date}
                  onChange={(e) => setBookingForm({...bookingForm, preferred_date: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="booking-time" className="text-white">Preferred Time *</Label>
                <Input 
                  id="booking-time"
                  data-testid="booking-time-input"
                  type="time"
                  required
                  value={bookingForm.preferred_time}
                  onChange={(e) => setBookingForm({...bookingForm, preferred_time: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="booking-message" className="text-white">Additional Details</Label>
              <Textarea 
                id="booking-message"
                data-testid="booking-message-input"
                value={bookingForm.message}
                onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Describe your issue or requirements..."
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-cyan-500 hover:bg-cyan-600"
              disabled={loading}
              data-testid="booking-submit-btn"
            >
              {loading ? "Booking..." : "Book Appointment"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Contact Modal */}
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent className="sm:max-w-md bg-gray-900 border-cyan-500/30" data-testid="contact-modal">
          <DialogHeader>
            <DialogTitle className="text-white">Contact Us</DialogTitle>
            <DialogDescription className="text-gray-400">
              Send us a message and we'll get back to you soon.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <Label htmlFor="contact-name" className="text-white">Name *</Label>
              <Input 
                id="contact-name"
                data-testid="contact-name-input"
                required
                value={contactForm.name}
                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="contact-email" className="text-white">Email *</Label>
              <Input 
                id="contact-email"
                data-testid="contact-email-input"
                type="email"
                required
                value={contactForm.email}
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="contact-phone" className="text-white">Phone *</Label>
              <Input 
                id="contact-phone"
                data-testid="contact-phone-input"
                required
                value={contactForm.phone}
                onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="contact-message" className="text-white">Message *</Label>
              <Textarea 
                id="contact-message"
                data-testid="contact-message-input"
                required
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="How can we help you?"
                rows={4}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-cyan-500 hover:bg-cyan-600"
              disabled={loading}
              data-testid="contact-submit-btn"
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  );
}

export default App;
