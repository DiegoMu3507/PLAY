import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renderiza con el texto correcto', () => {
    render(<Button>Jugar</Button>)
    expect(screen.getByRole('button', { name: 'Jugar' })).toBeInTheDocument()
  })

  it('llama onClick al hacer clic', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Jugar</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('está deshabilitado cuando disabled=true', () => {
    render(<Button disabled>Jugar</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('muestra spinner cuando loading=true', () => {
    render(<Button loading>Jugar</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })
})
