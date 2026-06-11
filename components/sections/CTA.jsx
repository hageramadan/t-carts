import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { FaArrowRight } from 'react-icons/fa';

const CTA = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-brfrom-blue-600 to-purple-600 rounded-3xl p-12 md:p-16 text-center text-white"
        >
          <h1 className="text-4xl  text-[#025049] md:text-5xl font-bold mb-4">
            Ready to Get Started?
          </h1>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied customers and start your journey with us today.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="white" size="lg">
              Get Started Now <FaArrowRight className="inline ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;