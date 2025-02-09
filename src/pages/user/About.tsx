import { motion } from "framer-motion";
import { Shield, Users, Wrench } from "lucide-react";

const About = () => {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between lg:space-x-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Neighbr
              </span>
              ?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We're not just a management system – we're your partner in
              building thriving, connected communities where residents feel
              safe, valued, and truly at home.
            </p>
            <div className="space-y-6">
              {[
                {
                  icon: Shield,
                  title: "Industry-Leading Security",
                  description:
                    "Advanced encryption and privacy measures to protect your community",
                },
                {
                  icon: Users,
                  title: "Community Engagement",
                  description:
                    "Powerful tools to bring neighbors together and build lasting connections",
                },
                {
                  icon: Wrench,
                  title: "Smart Management",
                  description:
                    "Efficient solutions for seamless property operations and maintenance",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <item.icon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
