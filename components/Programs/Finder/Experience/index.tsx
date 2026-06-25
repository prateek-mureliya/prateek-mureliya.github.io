import FolderContent from '../../../UI/folder-view/folder-content';
import { TFolderContent } from '@/types/folder-view';
import {
  CardColor,
  Container,
  getColorByIndex,
  LeftSide,
  TColor,
  Timeline,
  TimelineBadge,
  TimelineBadges,
  TimelineItem,
  TTimeline,
  TTimelineImpact,
} from '../UI';
import GradientText from '@/components/UI/gradient-text';
import { RxCalendar } from 'react-icons/rx';
import { FaArrowTrendUp, FaServer, FaPeopleGroup, FaBusSimple, FaGift } from 'react-icons/fa6';
import { BsBank2, BsDatabaseCheck, BsFillLightningChargeFill, BsGlobe, BsQrCodeScan, BsStars } from 'react-icons/bs';
import { TIconType } from '@/types/icon-type';
import { calYearExperience, cn } from '@/lib/utils';
import { BasicProps } from '@/types/basic-props';
import { CleartripIcon, MaventechLabsIcon, TravelyaariIcon } from '@/components/custom-icons';
import { MdOutlineCheckBox } from 'react-icons/md';
import { ExperienceImpact, ExperienceImpactPopup } from './ExperienceImpact';
import { isMobile } from 'react-device-detect';
import { useState } from 'react';
import { TbCalendarWeek } from 'react-icons/tb';

type TSummary = {
  icon: TIconType;
  title: string;
  description: string;
};

const summary: TSummary[] = [
  {
    icon: RxCalendar,
    title: calYearExperience(),
    description: 'Years of Experience',
  },
  {
    icon: FaArrowTrendUp,
    title: '30%',
    description: 'Increase in Repeat Bookings',
  },
  {
    icon: BsFillLightningChargeFill,
    title: '20%',
    description: 'Fast Transactions',
  },
  {
    icon: FaServer,
    title: 'Millions',
    description: 'Events & Requests Processed',
  },
  {
    icon: FaPeopleGroup,
    title: 'Multiple',
    description: 'Travel Platforms Integrated',
  },
];

const GPSBusTrackingSystem: TTimelineImpact = {
  icon: FaBusSimple,
  title: 'Real-Time Bus Tracking System',
  description:
    'Build a real-time GPS tracking platform that providers live bus location update to thousands of travelers.',
  impact: 'Improved customer experience',
  scale: 'Thousands of daily active users',
  ownership: 'End-to-end architecture & development',
  stack: (
    <TimelineBadges>
      <Java />
      <Springboot />
      <Kafka />
      <Elasticsearch />
      <MapApi />
    </TimelineBadges>
  ),
  achievements: [
    'Enabled live bus map visualization',
    'Indexed geo-location data in Elasticsearch',
    'Designed event-driven architecture',
  ],
};

const CoinRewardSystem: TTimelineImpact = {
  icon: FaGift,
  title: 'Coin-Based Reward System',
  description:
    'Designed and developed a customer rewards ecosystem allowing users to earn and redeem coins across bus ticket bookings.',
  impact: 'Improved customer loyalty and encouraged repeat bookings',
  scale: 'Thousands of reward transactions',
  ownership: 'Reward engine architecture',
  stack: (
    <TimelineBadges>
      <Java />
      <Springboot />
      <MySql />
    </TimelineBadges>
  ),
  achievements: [
    'Built scalable reward management system',
    'Implemented earning and redemption workflows',
    'Created transaction-safe reward ledger',
  ],
};

const QRPaymentSystem: TTimelineImpact = {
  icon: BsQrCodeScan,
  title: 'Global QR Payment Platform',
  description:
    'Build a centralized QR payment platform integrated across multiple products and reusable payment infrastructure for the organization.',
  impact: 'Multi-product Ecosystem',
  scale: 'High transaction volume processing',
  ownership: 'Database schema design & QR provider integrations',
  stack: (
    <TimelineBadges>
      <Java />
      <Springboot />
      <MySql />
      <RestAPI />
    </TimelineBadges>
  ),
  achievements: ['Centralized QR Payment System', '20% Faster Payment Processing'],
};

const FundTransferSystem: TTimelineImpact = {
  icon: BsBank2,
  title: 'Fund Transfer & Settlement Platform',
  description:
    'Designed and developed a secure fund transfer and settlement platform by integrating with multiple banking systems through real-time APIs.',
  impact: 'Improved operational efficiency',
  scale: 'Real-time fund settlements',
  ownership: 'Banking API integrations',
  stack: (
    <TimelineBadges>
      <Java />
      <Springboot />
      <JWT />
      <RestAPI />
    </TimelineBadges>
  ),
  achievements: ['Integrated multiple bank APIs', 'Implemented JWT security', 'Automated settlement lifecycle'],
};

const CleartripProject: TTimelineImpact = {
  icon: MdOutlineCheckBox,
  title: 'Cleartrip Bus Booking Integration',
  description: 'Partnered with Cleartrip to launch bus booking capabilities into their travel ecosystem.',
  impact: 'Launched bus booking for millions of Cleartrip users',
  scale: 'Large volume of bookings and searches',
  ownership: 'Partner onboarding and integration support',
  stack: (
    <TimelineBadges>
      <Java />
      <Springboot />
      <RestAPI />
    </TimelineBadges>
  ),
  achievements: [
    'Delivered reliable and scalable API integrations',
    'Ensured high availability and scalability',
    'Improved partner ecosystem connectivity',
  ],
};

const DatabaseMigration: TTimelineImpact = {
  icon: BsDatabaseCheck,
  title: 'Database Migration',
  description: 'Led the migration of legacy MSSQL databases to MySQL on AWS RDS.',
  impact: 'Reduced database licensing and infrastructure costs',
  scale: 'Enhanced Scalability & Reliability',
  ownership: 'Migration strategy and planning',
  stack: (
    <TimelineBadges>
      <MySql />
      <MSSql />
      <RDS />
      <DMS />
    </TimelineBadges>
  ),
  achievements: [
    'Refactored and optimized legacy stored procedures for MySQL compatibility',
    'Executed a zero-disruption migration strategy for production systems',
    'Improved database scalability and maintainability',
  ],
};

const GDSSystem: TTimelineImpact = {
  icon: BsGlobe,
  title: 'Global Distribution System (GDS)',
  description: 'Developed a real-time bus inventory aggregation platform with caching and event-driven processing.',
  impact: 'Provided a single source of truth for travel inventory across partners',
  scale: 'Large travel network',
  ownership: 'Aggregation services & Queue processing',
  stack: (
    <TimelineBadges>
      <Java />
      <Redis />
      <SQS />
    </TimelineBadges>
  ),
  achievements: [
    'Aggregated inventory from multiple providers',
    'Implemented Redis caching layer',
    'Built event-driven scheduling system',
  ],
};

const experiences: TTimeline[] = [
  {
    interval: 'Sep 2021 - Present',
    title: 'Senior Software Engineer',
    desc: 'Maventech Labs Pvt. Ltd.',
    location: 'Bengaluru, India',
    points: (
      <TimelineBadges>
        <TimelineBadge title="Backend" color="Sky" />
        <TimelineBadge title="Payment" color="Sky" />
        <TimelineBadge title="Leadership" color="Sky" />
      </TimelineBadges>
    ),
    color: 'Sky',
    icon: MaventechLabsIcon,
    impacts: [GPSBusTrackingSystem, CoinRewardSystem, QRPaymentSystem, FundTransferSystem],
  },
  {
    interval: '(Client Project)',
    title: 'Senior Software Engineer',
    desc: 'Cleartrip',
    location: 'Bengaluru, India',
    points: (
      <TimelineBadges>
        <TimelineBadge title="6 Months" color="Pink" icon={TbCalendarWeek} />
        <TimelineBadge title="Travel Partner" color="Pink" />
      </TimelineBadges>
    ),
    color: 'Pink',
    icon: CleartripIcon,
    impacts: [CleartripProject],
  },
  {
    interval: 'Dec 2018 - Aug 2021',
    title: 'Software Engineer',
    desc: 'Travelyaari (Mantis Technologies)',
    location: 'Bengaluru, India',
    points: (
      <TimelineBadges>
        <TimelineBadge title="DB Migration" color="Green" />
        <TimelineBadge title="Performance" color="Green" />
      </TimelineBadges>
    ),
    color: 'Green',
    icon: TravelyaariIcon,
    impacts: [DatabaseMigration, GDSSystem],
  },
];

function Java() {
  return <TimelineBadge title="Java" color="Pink" />;
}
function Springboot() {
  return <TimelineBadge title="Springboot" color="Pink" />;
}
function Kafka() {
  return <TimelineBadge title="Kafka" color="Sky" />;
}
function Elasticsearch() {
  return <TimelineBadge title="Elasticsearch" color="Sky" />;
}
function MySql() {
  return <TimelineBadge title="MySQL" color="Sky" />;
}
function MSSql() {
  return <TimelineBadge title="MSSQL" color="Sky" />;
}
function MapApi() {
  return <TimelineBadge title="Google Maps API" color="Yellow" />;
}
function Redis() {
  return <TimelineBadge title="Redis" color="Sky" />;
}
function RestAPI() {
  return <TimelineBadge title="Rest APIs" color="Yellow" />;
}
function RDS() {
  return <TimelineBadge title="AWS RDS" color="Yellow" />;
}
function DMS() {
  return <TimelineBadge title="AWS DMS" color="Yellow" />;
}
function SQS() {
  return <TimelineBadge title="AWS SQS" color="Yellow" />;
}
function JWT() {
  return <TimelineBadge title="JWT" color="Green" />;
}

function SummaryContainer({ children }: BasicProps) {
  return (
    <div className="sticky z-1 top-4 h-26">
      <div className="bg-background absolute z-0 -top-4 -left-4 -right-4 bottom-0"></div>
      <div className=" relative z-1 flex gap-4 w-[calc(100vw-78px)] lg:w-full lg:max-w-228 mx-auto overflow-x-auto">
        {children}
      </div>
    </div>
  );
}

function Summary({ icon: Icon, title, description, color }: TSummary & { color: TColor }) {
  return (
    <div
      className={cn(
        'w-43 lg:w-fit shrink-0 lg:shrink-1 grow-1 flex gap-3 lg:gap-5 p-3 border rounded-sm',
        CardColor[color]
      )}
    >
      <div className="mt-2">
        <Icon className="size-6" />
      </div>
      <div className="text-xs">
        <div className="font-bold text-lg">{title}</div>
        <div className="text-foreground/80">{description}</div>
      </div>
    </div>
  );
}

export default function Experience(props: TFolderContent) {
  const [selectedExp, setSelectedExp] = useState(0);

  return (
    <FolderContent {...props} isGrid={false} orangeDrop={false}>
      <SummaryContainer>
        {summary.map((props, idx) => (
          <Summary key={props.title} {...props} color={getColorByIndex(idx)} />
        ))}
      </SummaryContainer>

      <Container className="mt-3">
        <LeftSide>
          <h1 className="font-extrabold text-lg mb-2">
            Work <GradientText>Experience</GradientText> <BsStars className="inline text-yellow-400" />
          </h1>
          <Timeline>
            {experiences.map((props, idx) => (
              <TimelineItem key={idx} {...props} onClick={() => setSelectedExp(idx)}>
                <ExperienceImpactPopup color={props.color} impacts={props.impacts} />
              </TimelineItem>
            ))}
          </Timeline>
        </LeftSide>

        {!isMobile && (
          <ExperienceImpact
            className="hidden sm:block sticky top-33 w-100 h-110 sm:h-110 ml-12"
            color={experiences[selectedExp].color}
            impacts={experiences[selectedExp].impacts}
          />
        )}
      </Container>
    </FolderContent>
  );
}
