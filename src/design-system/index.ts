/**
 * EcoStore Design System — punto de entrada único.
 *
 *   import '@ds/styles/index.css'        // una vez, en main.tsx
 *   import { Button, Card } from '@ds'   // en cualquier componente
 */

// Tokens (JS)
export * from './tokens/tokens'

// Utilidades
export { cx } from './utils/cx'

// Íconos
export * from './icons'

// Primitivos
export { Button } from './components/Button/Button'
export type { ButtonProps, ButtonVariant, ButtonSize, ButtonShape } from './components/Button/Button'

export { Input } from './components/Form/Input'
export type { InputProps } from './components/Form/Input'
export { Textarea } from './components/Form/Textarea'
export type { TextareaProps } from './components/Form/Textarea'
export { Select } from './components/Form/Select'
export type { SelectProps, SelectOption } from './components/Form/Select'
export { Checkbox } from './components/Form/Checkbox'
export type { CheckboxProps } from './components/Form/Checkbox'
export { FormField, InlineGroup } from './components/Form/FormField'
export type { FormFieldProps, InlineGroupProps } from './components/Form/FormField'

export { Card } from './components/Card/Card'
export type { CardProps, CardVariant, CardPadding } from './components/Card/Card'

export { IconCircle } from './components/IconCircle/IconCircle'
export type { IconCircleProps, IconCircleTone, IconCircleSize } from './components/IconCircle/IconCircle'

export { Heading, Highlight, Em, Lead, Label, Text, Eyebrow, Script } from './components/Typography/Typography'
export type { HeadingProps, HeadingLevel, HeadingTone, EmTone, TextProps, TextSize, TextTone, TextWeight, EyebrowProps } from './components/Typography/Typography'

export { Container, Section, Stack, Row, Grid } from './components/Layout/Layout'
export type { ContainerProps, SectionProps, SectionBackground, StackProps, GridProps } from './components/Layout/Layout'

export { Logo } from './components/Logo/Logo'
export type { LogoProps } from './components/Logo/Logo'

export { SocialLinks } from './components/SocialLinks/SocialLinks'
export type { SocialLinksProps, SocialLink, SocialNetwork } from './components/SocialLinks/SocialLinks'

// Patrones compuestos
export { Navbar } from './components/Navbar/Navbar'
export type { NavbarProps, NavItem, NavChild } from './components/Navbar/Navbar'

export { Footer } from './components/Footer/Footer'
export type { FooterProps, FooterColumn, FooterLink, FooterContact } from './components/Footer/Footer'

export { Hero } from './components/Hero/Hero'
export type { HeroProps, HeroVariant } from './components/Hero/Hero'

export { TrustItem, TrustList } from './components/TrustItem/TrustItem'
export type { TrustItemProps } from './components/TrustItem/TrustItem'

export { ContactCard, ContactMetaStrong } from './components/ContactCard/ContactCard'
export type { ContactCardProps } from './components/ContactCard/ContactCard'

export { Checklist, ChecklistCard } from './components/Checklist/Checklist'
export type { ChecklistProps, ChecklistCardProps } from './components/Checklist/Checklist'

export { SectionTitle } from './components/SectionTitle/SectionTitle'
export type { SectionTitleProps } from './components/SectionTitle/SectionTitle'

export { Reveal } from './components/Reveal/Reveal'
export type { RevealProps } from './components/Reveal/Reveal'

// Patrones premium
export { Stat, StatBar } from './components/Stat/Stat'
export type { StatProps, StatBarProps } from './components/Stat/Stat'

export { SectionHeader } from './components/SectionHeader/SectionHeader'
export type { SectionHeaderProps } from './components/SectionHeader/SectionHeader'

export { Steps } from './components/Steps/Steps'
export type { StepsProps, Step } from './components/Steps/Steps'

export { Accordion } from './components/Accordion/Accordion'
export type { AccordionProps, AccordionItem } from './components/Accordion/Accordion'

export { Quote } from './components/Quote/Quote'
export type { QuoteProps } from './components/Quote/Quote'

export { CtaBand } from './components/CtaBand/CtaBand'
export type { CtaBandProps } from './components/CtaBand/CtaBand'

export { MapEmbed } from './components/MapEmbed/MapEmbed'
export type { MapEmbedProps } from './components/MapEmbed/MapEmbed'

export { CategoryBand, SolutionCard } from './components/Catalog/Catalog'
export type { CategoryBandProps, SolutionCardProps, CategoryTone } from './components/Catalog/Catalog'
