import s from "./EditBox.module.scss";
import cn from 'classnames'
import { useEffect, useState } from "react";
import { arrayMoveImmutable } from 'array-move';
import useDevice from "/lib/hooks/useDevice";

type EditBoxProps = {
  onContentChange: (content: MemberModelContentField[]) => void,
  onSelect: (image: MemberModelContentField) => void,
  onRemove: (id: string) => void,
  content: MemberModelContentField[]
}

export default function EditBox({ onSelect, onContentChange, onRemove, content }: EditBoxProps) {

  const [editBoxStyle, setEditBoxStyle] = useState<any | undefined>()
  const [editable, setEditable] = useState<any | undefined>()
  const [block, setBlock] = useState<MemberModelContentField | undefined>()
  const { isDesktop, isTablet, isMobile } = useDevice()

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
      const padding = 20;

      setEditBoxStyle({
        top: (bounds.top - padding) + window.scrollY - (isTablet || isMobile ? 0 : 99),
        left: bounds.left - padding,
        width: width + (padding * 2),
        height: height + (padding * 2)
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

  const moveBlock = (e, editable: any, up: boolean) => {

    e.stopPropagation()

    if (!editable) return

    const from = parseInt(editable.index)
    const to = up ? (from - 1 >= 0 ? from - 1 : 0) : (from + 1) < content.length - 1 ? (from + 1) : content.length - 1
    const newContent = arrayMoveImmutable(content, from, to)

    onContentChange(newContent)
    reset()

    setTimeout(() => {
      const el = findElement(editable.id)
      el.scrollIntoView({ behavior: "smooth", block: 'center' })
    }, 100)
  }

  const deleteBlock = (e, editable: any) => {
    e.stopPropagation()
    onRemove(editable.id)
  }

  useEffect(() => { init() }, [content, isDesktop])
  useEffect(() => { onSelect(block) }, [block])

  return (
    <div
      id="edit-box"
      className={cn(s.editBox, editBoxStyle && s.show)}
      style={editBoxStyle}
    >
      <div className={s.toolbar}>
        <div className={s.edit}>
          <button onClick={() => setBlock(editable as MemberModelContentField)}>
            Redigera
          </button>
          <button className={s.delete} onClick={(e) => { deleteBlock(e, editable); setEditBoxStyle(undefined) }}>
            Ta bort
          </button>
        </div>
        {editable?.index !== undefined &&
          <div className={cn(s.order)}>
            <button
              className={s.up}
              disabled={editable?.index === 0}
              onClick={(e) => moveBlock(e, editable, true)}
            >Upp</button>
            <button
              className={s.down}
              disabled={editable?.index === content.length - 1}
              onClick={(e) => moveBlock(e, editable, false)}
            >Ner</button>
          </div>
        }
      </div>
    </div>

  )
}
