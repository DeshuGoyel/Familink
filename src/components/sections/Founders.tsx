import { motion } from 'framer-motion';

const founders = [
  {
    name: 'Deshu Goyel',
    role: 'Founder',
    bio: 'Pioneering zero-knowledge digital inheritance.',
    image: 'https://ui-avatars.com/api/?name=Deshu+Goyel&background=4F5CFF&color=fff&size=200'
  },
  {
    name: 'Vikash Kumar Singh',
    role: 'Co-Founder',
    bio: 'Architecting secure decentralization protocols.',
    image: 'https://ui-avatars.com/api/?name=Vikash+Kumar+Singh&background=D4AF37&color=000&size=200'
  }
];

export default function Founders() {
  return (
    <section id="founders" className="py-24 bg-[#020409] relative overflow-hidden">
      {/* Background flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-6"
          >
            Built by <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Security Experts</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#8B949E] text-lg max-w-2xl mx-auto"
          >
            We are deeply committed to ensuring your family's digital wealth is never lost.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {founders.map((founder, i) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group bg-[#0D1117] border border-white/10 hover:border-indigo-500/30 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6 transition-all hover:bg-[#111620]"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-indigo-400/50 transition-colors flex-shrink-0">
                <img 
                  src={founder.image} 
                  alt={founder.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-bold text-white font-display mb-1">
                  {founder.name}
                </h3>
                <p className="text-gold font-medium mb-3 uppercase tracking-wider text-sm">
                  {founder.role}
                </p>
                <p className="text-[#8B949E] text-sm">
                  {founder.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
