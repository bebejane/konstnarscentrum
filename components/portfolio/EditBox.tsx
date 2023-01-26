import s from "./EditBox.module.scss";
import cn from 'classnames'
import { useCallback, useEffect, useState } from "react";
import { arrayMoveImmutable } from 'array-move';
import useDevice from "/lib/hooks/useDevice";

type EditBoxProps = {
  onContentChange: (content: MemberModelContentField[]) => void,
  onSelect: (image: MemberModelContentField) => void,
  onImageSelect: (image: FileField) => void,
  onRemove: (id: string) => void,
  content: MemberModelContentField[]
  disable: boolean
}

export default function EditBox({ onSelect, onImageSelect, onContentChange, onRemove, content, disable }: EditBoxProps) {

  const [editBoxStyle, setEditBoxStyle] = useState<any | undefined>()
  const [editable, setEditable] = useState<any | undefined>()
  const [block, setBlock] = useState<MemberModelContentField | undefined>()
  const { isDesktop } = useDevice()

  const findElement = (id) => {
    const editables = Array.from(document.querySelectorAll('[data-editable]')) as HTMLElement[]

    return editables.find(el => el.dataset.editable && JSON.parse(el.dataset.editable).id === id)
  }

  const reset = () => {
    setEditBoxStyle(undefined)
    setEditable(undefined)
  }
  const handleEdit = (e) => {
    if (editable.nodelete)
      onImageSelect(editable)
    else
      setBlock(editable as MemberModelContentField)
  }
  const init = useCallback(() => {

    const handleMouseEnter = (e) => {
      const target = e.target as HTMLElement

      if (disable || !target.dataset.editable) return

      const computedStyle = getComputedStyle(target)
      const height = target.clientHeight - (parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom))
      const width = target.clientWidth - (parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight))
      const bounds = target.getBoundingClientRect();
      const offsetLeft = parseInt(computedStyle.paddingLeft)
      const offsetTop = parseInt(computedStyle.paddingTop)

      const padding = 20;

      setEditBoxStyle({
        top: (bounds.top - padding) + offsetTop + window.scrollY - (!isDesktop ? 0 : 99),
        left: bounds.left - padding + offsetLeft,
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
      el.addEventListener('mousemove', handleMouseEnter)
      editBox.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      editables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mousemove', handleMouseEnter)
        editBox.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [isDesktop, disable])

  const handleMoveBlock = (e) => {

    e.stopPropagation()

    if (!editable) return

    const up = e.target.id === 'editbox-up'
    const from = parseInt(editable.index)
    const to = up ? (from - 1 >= 0 ? from - 1 : 0) : (from + 1) < content.length - 1 ? (from + 1) : content.length - 1
    const newContent = arrayMoveImmutable(content, from, to)

    onContentChange(newContent)
    reset()

    setTimeout(() => {
      const el = findElement(editable.id)
      el.scrollIntoView({ behavior: "smooth", block: 'center' })
    }, 250)
  }

  const handleRemoveBlock = (e) => {
    e.stopPropagation();
    onRemove(editable.id)
    setEditBoxStyle(undefined);
  }


  useEffect(() => { return init() }, [content, isDesktop, init, disable])
  useEffect(() => { onSelect(block) }, [block])

  return (
    <div
      id="edit-box"
      className={cn(s.editBox, editBoxStyle && s.show)}
      style={editBoxStyle}
      onClick={handleEdit}
    >
      <div className={s.toolbar}>
        <div className={s.edit}>
          <button onClick={handleEdit}>
            Redigera
          </button>
          {!editable?.nodelete &&
            <button className={s.delete} onClick={handleRemoveBlock}>
              Ta bort
            </button>
          }
        </div>
        {editable?.index !== undefined &&
          <div className={s.order}>
            <button
              id="editbox-up"
              className={s.up}
              onClick={handleMoveBlock}
              disabled={editable?.index === 0}

            >↑</button>
            <button
              id="editbox-down"
              className={s.down}
              onClick={handleMoveBlock}
              disabled={editable?.index === content.length - 1}

            >↓</button>
          </div>
        }
      </div>
    </div>

  )
}
