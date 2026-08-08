'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
    DiReact, DiJava, DiNodejs, DiPython, DiDocker, DiGit, DiBootstrap, DiDatabase,
} from 'react-icons/di';
import {
    SiTypescript, SiNextdotjs, SiSpringboot, SiElectron, SiPostgresql, SiSqlite, SiCplusplus, SiDotnet,
    SiKotlin, SiSwift, SiIonic, SiAndroidstudio, SiThymeleaf, SiSpringsecurity, SiCloudflare, SiTailwindcss,
} from 'react-icons/si';
import { VscTerminalCmd } from 'react-icons/vsc';
import { TbBrandCSharp } from 'react-icons/tb';

type Leaf = {
    name: string;
    icon: IconType;
    /**
     * Set when the skill's real home is a different branch. Rendered like a symlink in
     * `ls -l`, which is the whole point of this section: the directories are a filing
     * convenience, not a description of where the work actually happens.
     */
    linkTo?: string;
};

type Branch = {
    dir: string;
    leaves: Leaf[];
};

const TREE: Branch[] = [
    {
        dir: 'frontend',
        leaves: [
            { name: 'React', icon: DiReact },
            { name: 'Next.js', icon: SiNextdotjs },
            { name: 'TypeScript', icon: SiTypescript },
            { name: 'Tailwind', icon: SiTailwindcss },
            { name: 'Bootstrap', icon: DiBootstrap },
            { name: 'Thymeleaf', icon: SiThymeleaf },
            { name: 'Node.js', icon: DiNodejs, linkTo: '../backend/Node.js' },
        ],
    },
    {
        dir: 'backend',
        leaves: [
            { name: 'Java', icon: DiJava },
            { name: 'Spring Boot', icon: SiSpringboot },
            { name: 'Spring Security', icon: SiSpringsecurity },
            { name: 'Node.js', icon: DiNodejs },
            { name: 'Python', icon: DiPython },
            { name: 'C#', icon: TbBrandCSharp },
            { name: '.NET', icon: SiDotnet },
            { name: 'C++', icon: SiCplusplus },
            { name: 'TypeScript', icon: SiTypescript, linkTo: '../frontend/TypeScript' },
        ],
    },
    {
        dir: 'mobile-desktop',
        leaves: [
            { name: 'Electron', icon: SiElectron },
            { name: 'Kotlin', icon: SiKotlin },
            { name: 'Swift', icon: SiSwift },
            { name: 'Ionic', icon: SiIonic },
            { name: 'Android Studio', icon: SiAndroidstudio },
            { name: 'React', icon: DiReact, linkTo: '../frontend/React' },
        ],
    },
    {
        dir: 'infra',
        leaves: [
            { name: 'Docker', icon: DiDocker },
            { name: 'Git', icon: DiGit },
            { name: 'Bash', icon: VscTerminalCmd },
            { name: 'SQL', icon: DiDatabase },
            { name: 'PostgreSQL', icon: SiPostgresql },
            { name: 'SQLite', icon: SiSqlite },
            { name: 'Cloudflare', icon: SiCloudflare },
        ],
    },
];

const ALL_DIRS = TREE.map((branch) => branch.dir);
const REAL_SKILLS = new Set(
    TREE.flatMap((branch) => branch.leaves.filter((leaf) => !leaf.linkTo).map((leaf) => leaf.name)),
);
const SYMLINK_COUNT = TREE.reduce(
    (total, branch) => total + branch.leaves.filter((leaf) => leaf.linkTo).length,
    0,
);

const rowId = (dir: string, leaf?: Leaf) => (leaf ? `${dir}/${leaf.name}` : dir);

/** Splits a label around the filter query so the match can be highlighted in place. */
function splitOnQuery(label: string, query: string): [string, string, string] {
    if (!query) return [label, '', ''];
    const at = label.toLowerCase().indexOf(query);
    if (at < 0) return [label, '', ''];
    return [label.slice(0, at), label.slice(at, at + query.length), label.slice(at + query.length)];
}

export default function SkillTree() {
    const t = useTranslations('Skills');
    const [collapsed, setCollapsed] = useState<string[]>([]);
    const [query, setQuery] = useState('');
    const [focused, setFocused] = useState<string>(ALL_DIRS[0]);
    const rowRefs = useRef(new Map<string, HTMLButtonElement>());

    const needle = query.trim().toLowerCase();

    // While filtering, every branch is forced open — a hidden match is a useless match.
    const isOpen = useCallback(
        (dir: string) => (needle ? true : !collapsed.includes(dir)),
        [collapsed, needle],
    );

    const branches = useMemo(
        () =>
            TREE.map((branch) => ({
                ...branch,
                leaves: needle
                    ? branch.leaves.filter(
                          (leaf) =>
                              leaf.name.toLowerCase().includes(needle) ||
                              branch.dir.toLowerCase().includes(needle),
                      )
                    : branch.leaves,
            })).filter((branch) => branch.leaves.length > 0),
        [needle],
    );

    /** Flat list of what is on screen, in visual order — the basis for arrow-key movement. */
    const visibleRows = useMemo(() => {
        const rows: string[] = [];
        branches.forEach((branch) => {
            rows.push(branch.dir);
            if (isOpen(branch.dir)) {
                branch.leaves.forEach((leaf) => rows.push(rowId(branch.dir, leaf)));
            }
        });
        return rows;
    }, [branches, isOpen]);

    const focusRow = useCallback((id: string) => {
        setFocused(id);
        rowRefs.current.get(id)?.focus();
    }, []);

    const toggle = useCallback((dir: string) => {
        setCollapsed((prev) => (prev.includes(dir) ? prev.filter((d) => d !== dir) : [...prev, dir]));
    }, []);

    const onKeyDown = useCallback(
        (event: React.KeyboardEvent) => {
            const index = visibleRows.indexOf(focused);
            const isDir = ALL_DIRS.includes(focused);

            switch (event.key) {
                case 'ArrowDown':
                    event.preventDefault();
                    focusRow(visibleRows[Math.min(index + 1, visibleRows.length - 1)]);
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    focusRow(visibleRows[Math.max(index - 1, 0)]);
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    if (isDir && !isOpen(focused)) toggle(focused);
                    else if (isDir && index + 1 < visibleRows.length) focusRow(visibleRows[index + 1]);
                    break;
                case 'ArrowLeft':
                    event.preventDefault();
                    if (isDir && isOpen(focused)) toggle(focused);
                    else if (!isDir) focusRow(focused.split('/')[0]);
                    break;
                case 'Home':
                    event.preventDefault();
                    focusRow(visibleRows[0]);
                    break;
                case 'End':
                    event.preventDefault();
                    focusRow(visibleRows[visibleRows.length - 1]);
                    break;
                case 'Enter':
                case ' ':
                    if (isDir) {
                        event.preventDefault();
                        toggle(focused);
                    }
                    break;
                default:
                    break;
            }
        },
        [focusRow, focused, isOpen, toggle, visibleRows],
    );

    const allCollapsed = collapsed.length === ALL_DIRS.length;

    return (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/60 backdrop-blur-sm overflow-hidden shadow-sm dark:shadow-[0_0_40px_rgba(59,130,246,0.05)]">
            {/* Terminal chrome */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-100/80 dark:bg-gray-900/80">
                <div className="flex gap-1.5" aria-hidden="true">
                    <span className="w-3 h-3 rounded-full bg-red-400/70 dark:bg-red-500/50" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400/70 dark:bg-yellow-500/50" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400/70 dark:bg-emerald-500/50" />
                </div>
                <code className="font-mono text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                    <span className="text-emerald-600 dark:text-emerald-400">$</span> tree ~/michal --show-symlinks
                </code>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                <label className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-gray-950/60 border border-gray-200 dark:border-gray-800 focus-within:border-blue-500/60 transition-colors">
                    <span className="font-mono text-xs text-gray-400 dark:text-gray-600" aria-hidden="true">
                        /
                    </span>
                    <input
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder={t('treeFilter')}
                        aria-label={t('treeFilter')}
                        className="w-full bg-transparent font-mono text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-600 outline-none"
                    />
                </label>
                <button
                    type="button"
                    onClick={() => setCollapsed(allCollapsed ? [] : ALL_DIRS)}
                    className="font-mono text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/50 transition-colors whitespace-nowrap"
                >
                    {allCollapsed ? t('treeExpandAll') : t('treeCollapseAll')}
                </button>
            </div>

            {/* Tree */}
            <div
                role="tree"
                aria-label={t('title')}
                onKeyDown={onKeyDown}
                className="p-4 font-mono text-sm overflow-x-auto"
            >
                <div className="text-gray-500 dark:text-gray-500 mb-1 select-none">~/michal</div>

                {branches.length === 0 && (
                    <p className="text-gray-500 dark:text-gray-500 py-6 text-center">
                        {t('treeNoMatch', { query: query.trim() })}
                    </p>
                )}

                {branches.map((branch, branchIndex) => {
                    const open = isOpen(branch.dir);
                    const lastBranch = branchIndex === branches.length - 1;

                    return (
                        <div key={branch.dir} className="relative">
                            {/* Directory row */}
                            <button
                                type="button"
                                role="treeitem"
                                aria-expanded={open}
                                aria-selected={focused === branch.dir}
                                tabIndex={focused === branch.dir ? 0 : -1}
                                ref={(node) => {
                                    if (node) rowRefs.current.set(branch.dir, node);
                                    else rowRefs.current.delete(branch.dir);
                                }}
                                onFocus={() => setFocused(branch.dir)}
                                onClick={() => {
                                    toggle(branch.dir);
                                    setFocused(branch.dir);
                                }}
                                className="group flex items-center gap-2 w-full text-left py-1 rounded outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
                            >
                                <span className="text-gray-400 dark:text-gray-600 select-none" aria-hidden="true">
                                    {lastBranch ? '└──' : '├──'}
                                </span>
                                <motion.span
                                    animate={{ rotate: open ? 90 : 0 }}
                                    transition={{ duration: 0.18 }}
                                    className="text-blue-500 dark:text-blue-400 select-none"
                                    aria-hidden="true"
                                >
                                    ▸
                                </motion.span>
                                <span className="font-semibold text-blue-600 dark:text-blue-300 group-hover:text-blue-500 dark:group-hover:text-blue-200 transition-colors">
                                    {branch.dir}/
                                </span>
                                <span className="text-xs text-gray-400 dark:text-gray-600">
                                    {branch.leaves.length}
                                </span>
                            </button>

                            {/* Leaves */}
                            <AnimatePresence initial={false}>
                                {open && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.22, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <div
                                            role="group"
                                            className={lastBranch ? 'pl-[1.1rem]' : 'pl-[1.1rem] border-l border-gray-200 dark:border-gray-800 ml-[0.4rem]'}
                                        >
                                            {branch.leaves.map((leaf, leafIndex) => {
                                                const id = rowId(branch.dir, leaf);
                                                const lastLeaf = leafIndex === branch.leaves.length - 1;
                                                const [before, match, after] = splitOnQuery(leaf.name, needle);

                                                return (
                                                    <button
                                                        key={id}
                                                        type="button"
                                                        role="treeitem"
                                                        aria-selected={focused === id}
                                                        tabIndex={focused === id ? 0 : -1}
                                                        ref={(node) => {
                                                            if (node) rowRefs.current.set(id, node);
                                                            else rowRefs.current.delete(id);
                                                        }}
                                                        onFocus={() => setFocused(id)}
                                                        title={leaf.linkTo ? t('treeSymlinkHint') : undefined}
                                                        className="group flex items-center gap-2 w-full text-left py-1 rounded outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
                                                    >
                                                        <span
                                                            className="text-gray-400 dark:text-gray-600 select-none"
                                                            aria-hidden="true"
                                                        >
                                                            {lastLeaf ? '└──' : '├──'}
                                                        </span>
                                                        <leaf.icon
                                                            className={`text-lg shrink-0 transition-colors ${
                                                                leaf.linkTo
                                                                    ? 'text-gray-400 dark:text-gray-600 group-hover:text-emerald-500'
                                                                    : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400'
                                                            }`}
                                                            aria-hidden="true"
                                                        />
                                                        <span
                                                            className={`transition-colors ${
                                                                leaf.linkTo
                                                                    ? 'text-emerald-600/80 dark:text-emerald-400/80 italic'
                                                                    : 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white'
                                                            }`}
                                                        >
                                                            {before}
                                                            {match && (
                                                                <mark className="bg-yellow-300/60 dark:bg-yellow-400/30 text-inherit rounded px-0.5">
                                                                    {match}
                                                                </mark>
                                                            )}
                                                            {after}
                                                        </span>
                                                        {leaf.linkTo && (
                                                            <span className="text-xs text-gray-400 dark:text-gray-600 truncate">
                                                                → {leaf.linkTo}
                                                            </span>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>

            {/* Footer legend — the punchline of the whole section */}
            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 bg-gray-100/50 dark:bg-gray-900/50 font-mono text-xs text-gray-500 dark:text-gray-500">
                {t('treeLegend', { dirs: ALL_DIRS.length, skills: REAL_SKILLS.size, links: SYMLINK_COUNT })}
            </div>
        </div>
    );
}
