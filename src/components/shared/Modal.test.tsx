import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Modal } from './Modal'

describe('Modal', () => {
  it('no renderiza cuando isOpen=false', () => {
    render(<Modal isOpen={false} onClose={vi.fn()} title="Test"><p>contenido</p></Modal>)
    expect(screen.queryByText('contenido')).not.toBeInTheDocument()
  })

  it('renderiza cuando isOpen=true', () => {
    render(<Modal isOpen={true} onClose={vi.fn()} title="Test"><p>contenido</p></Modal>)
    expect(screen.getByText('contenido')).toBeInTheDocument()
  })

  it('llama onClose al presionar Escape', async () => {
    const onClose = vi.fn()
    render(<Modal isOpen={true} onClose={onClose} title="Test"><p>x</p></Modal>)
    await userEvent.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledOnce()
  })
})
