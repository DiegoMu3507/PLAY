import type { AgeRange, SkillCategory } from '../../types/game'
import { AGE_LABELS, SKILL_LABELS } from '../../types/game'

interface GameFiltersProps {
  selectedAge: AgeRange | 'all'
  selectedSkill: SkillCategory | 'all'
  onAgeChange: (age: AgeRange | 'all') => void
  onSkillChange: (skill: SkillCategory | 'all') => void
  ageCounts: Record<AgeRange | 'all', number>
  skillCounts: Record<SkillCategory | 'all', number>
}

const AGES: Array<AgeRange | 'all'> = ['all', '4-6', '7-9', '10-12', '13-16']
const SKILLS: Array<SkillCategory | 'all'> = [
  'all', 'atencion', 'memoria', 'impulsos', 'velocidad', 'planificacion',
  'flexibilidad', 'visomotriz', 'lenguaje', 'logica', 'relajacion',
]

function chipClass(isActive: boolean) {
  return [
    'px-4 py-1.5 rounded-full text-sm font-semibold transition-all',
    isActive ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
  ].join(' ')
}

export function GameFilters({
  selectedAge, selectedSkill, onAgeChange, onSkillChange, ageCounts, skillCounts,
}: GameFiltersProps) {
  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="flex flex-wrap justify-center gap-2">
        {AGES.map((age) => (
          <button key={age} onClick={() => onAgeChange(age)} className={chipClass(selectedAge === age)}>
            {age === 'all' ? 'Todas las edades' : AGE_LABELS[age]}
            <span className="ml-1.5 text-xs opacity-75">({ageCounts[age]})</span>
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {SKILLS.map((skill) => (
          <button key={skill} onClick={() => onSkillChange(skill)} className={chipClass(selectedSkill === skill)}>
            {skill === 'all' ? 'Todas las habilidades' : SKILL_LABELS[skill]}
            <span className="ml-1.5 text-xs opacity-75">({skillCounts[skill]})</span>
          </button>
        ))}
      </div>
    </div>
  )
}
