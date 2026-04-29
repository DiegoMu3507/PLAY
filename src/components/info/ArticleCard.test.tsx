import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { ArticleCard } from './ArticleCard'
import type { Article } from '../../data/articles'

const mockArticle: Article = {
  slug: 'que-es-el-tdah',
  title: '¿Qué es el TDAH?',
  emoji: '🧠',
  category: 'fundamentos',
  categoryLabel: 'Fundamentos',
  summary: 'Una guía clara sobre el TDAH.',
  readTime: 5,
  targetAudience: 'all',
  content: '',
}

const renderCard = (onClick?: () => void) =>
  render(
    <MemoryRouter>
      <ArticleCard article={mockArticle} onClick={onClick} />
    </MemoryRouter>
  )

describe('ArticleCard', () => {
  it('muestra el emoji, título y resumen', () => {
    renderCard()
    expect(screen.getByText('🧠')).toBeInTheDocument()
    expect(screen.getByText('¿Qué es el TDAH?')).toBeInTheDocument()
    expect(screen.getByText('Una guía clara sobre el TDAH.')).toBeInTheDocument()
  })

  it('muestra el tiempo de lectura', () => {
    renderCard()
    expect(screen.getByText(/5 min/)).toBeInTheDocument()
  })

  it('muestra el badge de categoría', () => {
    renderCard()
    expect(screen.getByText('Fundamentos')).toBeInTheDocument()
  })

  it('llama onClick al hacer clic', async () => {
    const onClick = vi.fn()
    renderCard(onClick)
    await userEvent.click(screen.getByRole('article'))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
