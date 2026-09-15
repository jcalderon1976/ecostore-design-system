import type { HTMLAttributes } from 'react'
import { cx } from '../../utils/cx'
import { IconCircle, type IconCircleSize, type IconCircleTone } from '../IconCircle/IconCircle'
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from '../../icons'
import styles from './SocialLinks.module.css'

export type SocialNetwork = 'facebook' | 'instagram' | 'youtube' | 'linkedin'

export interface SocialLink {
  network: SocialNetwork
  href: string
}

export interface SocialLinksProps extends HTMLAttributes<HTMLUListElement> {
  links: SocialLink[]
  tone?: IconCircleTone
  size?: IconCircleSize
  /** Cuadrados con borde redondeado en lugar de círculos (estilo footer). */
  shape?: 'circle' | 'square'
}

const icons = {
  facebook: { Icon: FacebookIcon, label: 'Facebook' },
  instagram: { Icon: InstagramIcon, label: 'Instagram' },
  youtube: { Icon: YoutubeIcon, label: 'YouTube' },
  linkedin: { Icon: LinkedinIcon, label: 'LinkedIn' },
}

export function SocialLinks({ links, tone = 'outline', size = 'sm', shape = 'circle', className, ...rest }: SocialLinksProps) {
  return (
    <ul className={cx(styles.list, className)} {...rest}>
      {links.map(({ network, href }) => {
        const { Icon, label } = icons[network]
        return (
          <li key={network}>
            <a href={href} className={styles.link} aria-label={label} target="_blank" rel="noopener noreferrer">
              <IconCircle tone={tone} size={size} className={cx(shape === 'square' && styles.square)}>
                <Icon size={size === 'sm' ? 16 : 20} />
              </IconCircle>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
