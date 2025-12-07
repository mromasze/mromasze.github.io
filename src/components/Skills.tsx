'use client';

import { useTranslations } from 'next-intl';
import {
    DiReact, DiJava, DiNodejs, DiPython, DiDocker, DiGit, DiBootstrap, DiDatabase,
} from 'react-icons/di';
import {
    SiTypescript, SiNextdotjs, SiSpringboot, SiElectron, SiPostgresql, SiSqlite, SiCplusplus, SiDotnet,
    SiKotlin, SiSwift, SiIonic, SiAndroidstudio, SiThymeleaf, SiSpringsecurity, SiCloudflare
} from 'react-icons/si';
import { VscTerminalCmd } from "react-icons/vsc";
import { TbBrandCSharp } from "react-icons/tb";

const skills = [
    {
        icon: DiReact,
        name: 'React',
    },
    {
        icon: SiNextdotjs,
        name: 'Next.js',
    },
    {
        icon: DiJava,
        name: 'Java',
    },
    {
        icon: SiSpringboot,
        name: 'Spring Boot',
    },
    {
        icon: SiTypescript,
        name: 'TypeScript',
    },
    {
        icon: DiNodejs,
        name: 'Node.js',
    },
    {
        icon: SiElectron,
        name: 'Electron',
    },
    {
        icon: DiPython,
        name: 'Python',
    },
    {
        icon: SiCplusplus,
        name: 'C++',
    },
    {
        icon: TbBrandCSharp,
        name: 'C#',
    },
    {
        icon: SiDotnet,
        name: '.NET',
    },
    {
        icon: SiKotlin,
        name: 'Kotlin',
    },
    {
        icon: SiSwift,
        name: 'Swift',
    },
    {
        icon: SiIonic,
        name: 'Ionic',
    },
    {
        icon: SiAndroidstudio,
        name: 'Android Studio',
    },
    {
        icon: DiDocker,
        name: 'Docker',
    },
    {
        icon: DiGit,
        name: 'Git',
    },
    {
        icon: DiBootstrap,
        name: 'Bootstrap',
    },
    {
        icon: DiDatabase,
        name: 'SQL',
    },
    {
        icon: SiPostgresql,
        name: 'PostgreSQL',
    },
    {
        icon: SiSqlite,
        name: 'SQLite',
    },
    {
        icon: SiThymeleaf,
        name: 'Thymeleaf',
    },
    {
        icon: SiSpringsecurity,
        name: 'Spring Security',
    },
    {
        icon: VscTerminalCmd,
        name: 'Bash',
    },
    {
        icon: SiCloudflare,
        name: 'Cloudflare',
    }
];

export default function Skills() {
    const t = useTranslations('Skills');

    return (
        <section id="skills" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center mb-12">{t('title')}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {skills.map((skill, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <skill.icon className="text-6xl text-gray-400" />
                            <p className="mt-2 text-lg">{skill.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
