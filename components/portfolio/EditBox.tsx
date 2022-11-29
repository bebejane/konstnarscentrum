import s from "./EditBox.module.scss";
import cn from 'classnames'
import { useEffect, useState } from "react";
import { arrayMoveImmutable } from 'array-move';
import { PortfolioEditor } from "/components";
import EditIcon from '/public/images/edit.svg'

export default function EditBox({ onChange, blocks }) {

  const [editBoxStyle, setEditBoxStyle] = useState<any | undefined>()
  const [editable, setEditable] = useState<any | undefined>()
  const [images, setImages] = useState<FileField[] | undefined>()

  const findElement = (id) => {
    const editables = Array.from(document.querySelectorAll('[data-editable]')) as HTMLElement[]
    return editables.find(el => JSON.parse(el.dataset.editable).id === id)
  }

  const reset = () => {
    setEditBoxStyle(undefined)
    setEditable(undefined)
  }

  const init = () => {

    const handleMouseEnter = (e) => {

      const target = e.target as HTMLElement
      const computedStyle = getComputedStyle(target)
      const height = target.clientHeight - (parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom))
      const width = target.clientWidth - (parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight))

      const bounds = target.getBoundingClientRect();

      setEditBoxStyle({
        top: bounds.top + window.scrollY - 99,
        left: bounds.left,
        width,
        height
      })

      setEditable(JSON.parse(target.dataset.editable))
    }

    const handleMouseLeave = ({ target }) => {
      setEditBoxStyle(undefined)
      setEditable(undefined)
    }

    const editables = Array.from(document.querySelectorAll('[data-editable]'))
    const editBox = document.getElementById('edit-box')

    editables.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      editBox.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      editables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        editBox.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }

  const move = (e, editable: any, up: boolean) => {

    e.stopPropagation()

    if (!editable) return

    const from = parseInt(editable.index)
    const to = up ? (from - 1 >= 0 ? from - 1 : 0) : (from + 1) < blocks.length - 1 ? (from + 1) : blocks.length - 1
    const newBlocks = arrayMoveImmutable(blocks, from, to)

    onChange(newBlocks)
    reset()

    setTimeout(() => {
      const el = findElement(editable.id)
      el.scrollIntoView({ behavior: "smooth", block: 'center' })
    }, 100)
  }

  useEffect(() => { init() }, [blocks])

  return (
    <>
      <div
        id="edit-box"
        className={cn(s.editBox, editBoxStyle && s.show)}
        style={editBoxStyle}
        onClick={() => setImages(editable.image)}
      >
        <div className={s.toolbar}>
          <div className={s.edit}>
            <button>Redigera</button>
            <button className={s.delete}>Ta bort</button>
          </div>
          {editable?.index !== undefined &&
            <div className={cn(s.order)}>
              <button className={s.up} disabled={editable?.index === 0} onClick={(e) => move(e, editable, true)}>Upp</button>
              <button className={s.down} disabled={editable?.index === blocks.length - 1} onClick={(e) => move(e, editable, false)}>Ner</button>
            </div>
          }
        </div>
      </div>
      {
        images &&
        <PortfolioEditor images={images} onClose={() => setImages(undefined)} onSave={() => { }} />
      }
    </>
  )
}
