'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
    DiReact, DiJava, DiNodejs, DiPython, DiDocker, DiGit, DiBootstrap, DiDatabase,
} from 'react-icons/di';
import {
    SiTypescript, SiNextdotjs, SiSpringboot, SiElectron, SiPostgresql, SiSqlite, SiCplusplus, SiDotnet,
    SiKotlin, SiSwift, SiIonic, SiAndroidstudio, SiThymeleaf, SiSpringsecurity, SiCloudflare, SiTailwindcss
} from 'react-icons/si';
import { VscTerminalCmd } from "react-icons/vsc";
import { TbBrandCSharp } from "react-icons/tb";

const skillCategories = [
    {
        title: "Frontend",
        skills: [
            { icon: DiReact, name: 'React' },
            { icon: SiNextdotjs, name: 'Next.js' },
            { icon: SiTypescript, name: 'TypeScript' },
            { icon: SiTailwindcss, name: 'Tailwind' },
            { icon: DiBootstrap, name: 'Bootstrap' },
            { icon: SiThymeleaf, name: 'Thymeleaf' },
        ]
    },
    {
        title: "Backend",
        skills: [
            { icon: DiJava, name: 'Java' },
            { icon: SiSpringboot, name: 'Spring Boot' },
            { icon: DiNodejs, name: 'Node.js' },
            { icon: DiPython, name: 'Python' },
            { icon: TbBrandCSharp, name: 'C#' },
            { icon: SiDotnet, name: '.NET' },
            { icon: SiCplusplus, name: 'C++' },
            { icon: SiSpringsecurity, name: 'Spring Security' },
        ]
    },
    {
        title: "Mobile & Desktop",
        skills: [
            { icon: SiElectron, name: 'Electron' },
            { icon: SiKotlin, name: 'Kotlin' },
            { icon: SiSwift, name: 'Swift' },
            { icon: SiIonic, name: 'Ionic' },
            { icon: SiAndroidstudio, name: 'Android Studio' },
        ]
    },
    {
        title: "Tools & DevOps",
        skills: [
            { icon: DiDocker, name: 'Docker' },
            { icon: DiGit, name: 'Git' },
            { icon: DiDatabase, name: 'SQL' },
            { icon: SiPostgresql, name: 'PostgreSQL' },
            { icon: SiSqlite, name: 'SQLite' },
            { icon: VscTerminalCmd, name: 'Bash' },
            { icon: SiCloudflare, name: 'Cloudflare' },
        ]
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function Skills() {
    const t = useTranslations('Skills');

    return (
        <section id="skills" className="py-20 relative bg-gray-950">
             {/* Background decoration */}
             <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[300px] bg-purple-900/20 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-center mb-16 text-white"
                >
                    {t('title')}
                </motion.h2>
                
                <div className="space-y-16">
                    {skillCategories.map((category, catIndex) => (
                        <div key={catIndex}>
                            <motion.h3 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-2xl font-semibold mb-8 text-blue-200 pl-4 border-l-4 border-blue-500"
                            >
                                {category.title}
                            </motion.h3>
                            <motion.div 
                                variants={container}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: "-50px" }}
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
                            >
                                {category.skills.map((skill, index) => (
                                    <motion.div 
                                        variants={item}
                                        key={index} 
                                        className="flex flex-col items-center group"
                                    >
                                        <div className="w-full aspect-square flex items-center justify-center p-4 rounded-xl bg-gray-900/40 backdrop-blur-sm border border-gray-800 hover:border-blue-500/50 hover:bg-gray-800/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:-translate-y-1">
                                            <skill.icon className="text-5xl text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                                        </div>
                                        <p className="mt-3 text-sm font-medium text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                                            {skill.name}
                                        </p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
