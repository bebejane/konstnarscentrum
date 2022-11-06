import styles from './Text.module.scss'
import React from 'react'
import cn from 'classnames'
import Link from 'next/link';
import { StructuredText } from 'react-datocms';
import type { StructuredText as StructuredTextType } from 'datocms-structured-text-utils';


export default function Text({ data: { text }}) {
  
	return (
		<div className={cn(styles.text)}>
			<StructuredText 
        data={text}
        renderInlineRecord={({ record }) => {
          switch (record.__typename) {
            default:
              return null;
          }
        }}
        renderLinkToRecord={({ record, children, transformedMeta }) => {
          switch (record.__typename) {
            default:
              return null;
          }
        }}
        renderText={(text)=>{
          // Replace nbsp
          return text?.replace(/\s/g, ' ');
        }}
			/>
			
		</div>

	)
}