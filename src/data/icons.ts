import type { SvgComponent } from 'astro/types'
import PhArrowRight from '@phosphor-icons/core/assets/regular/arrow-right.svg'
import PhArrowUpRight from '@phosphor-icons/core/assets/regular/arrow-up-right.svg'
import PhBriefcase from '@phosphor-icons/core/assets/regular/briefcase.svg'
import PhChalkboardTeacher from '@phosphor-icons/core/assets/regular/chalkboard-teacher.svg'
import PhCheckCircle from '@phosphor-icons/core/assets/regular/check-circle.svg'
import PhCodeBlock from '@phosphor-icons/core/assets/regular/code-block.svg'
import PhEnvelopeSimple from '@phosphor-icons/core/assets/regular/envelope-simple.svg'
import PhGraduationCap from '@phosphor-icons/core/assets/regular/graduation-cap.svg'
import PhLinkedinLogo from '@phosphor-icons/core/assets/regular/linkedin-logo.svg'
import PhMapPin from '@phosphor-icons/core/assets/regular/map-pin.svg'
import PhRocketLaunch from '@phosphor-icons/core/assets/regular/rocket-launch.svg'
import PhTarget from '@phosphor-icons/core/assets/regular/target.svg'
import SiAngular from 'simple-icons/icons/angular.svg'
import SiCapacitor from 'simple-icons/icons/capacitor.svg'
import SiDocker from 'simple-icons/icons/docker.svg'
import SiGithubactions from 'simple-icons/icons/githubactions.svg'
import SiNestjs from 'simple-icons/icons/nestjs.svg'
import SiNextdotjs from 'simple-icons/icons/nextdotjs.svg'
import SiNuxt from 'simple-icons/icons/nuxt.svg'
import SiOpenjdk from 'simple-icons/icons/openjdk.svg'
import SiPostgresql from 'simple-icons/icons/postgresql.svg'
import SiReact from 'simple-icons/icons/react.svg'
import SiRedis from 'simple-icons/icons/redis.svg'
import SiSpringboot from 'simple-icons/icons/springboot.svg'
import SiTauri from 'simple-icons/icons/tauri.svg'
import SiTypescript from 'simple-icons/icons/typescript.svg'
import SiVuedotjs from 'simple-icons/icons/vuedotjs.svg'

export const phosphor = {
  'arrow-right': PhArrowRight,
  'arrow-up-right': PhArrowUpRight,
  briefcase: PhBriefcase,
  'chalkboard-teacher': PhChalkboardTeacher,
  'check-circle': PhCheckCircle,
  'code-block': PhCodeBlock,
  'envelope-simple': PhEnvelopeSimple,
  'graduation-cap': PhGraduationCap,
  'linkedin-logo': PhLinkedinLogo,
  'map-pin': PhMapPin,
  'rocket-launch': PhRocketLaunch,
  target: PhTarget,
} satisfies Record<string, SvgComponent>

export const simple = {
  angular: SiAngular,
  capacitor: SiCapacitor,
  docker: SiDocker,
  githubactions: SiGithubactions,
  nestjs: SiNestjs,
  nextdotjs: SiNextdotjs,
  nuxt: SiNuxt,
  openjdk: SiOpenjdk,
  postgresql: SiPostgresql,
  react: SiReact,
  redis: SiRedis,
  springboot: SiSpringboot,
  tauri: SiTauri,
  typescript: SiTypescript,
  vuedotjs: SiVuedotjs,
} satisfies Record<string, SvgComponent>
