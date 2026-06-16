import FolderContent from '../../../UI/folder-view/folder-content';
import { TFolderContent } from '@/types/folder-view';
import { CardColor, Container, LeftSide, TColor } from '../UI';
import GradientText from '@/components/UI/gradient-text';
import { RxCalendar } from 'react-icons/rx';
import { FaArrowTrendUp, FaServer, FaPeopleGroup, FaBusSimple, FaGift } from 'react-icons/fa6';
import { BsBank2, BsDatabaseCheck, BsFillLightningChargeFill, BsGlobe, BsQrCodeScan, BsStars } from 'react-icons/bs';
import { TIconType } from '@/types/icon-type';
import { calYearExperience, cn } from '@/lib/utils';
import { BasicProps } from '@/types/basic-props';
import { GrLocation } from 'react-icons/gr';
import { CleartripIcon, MaventechLabsIcon, TIconSvg, TravelyaariIcon } from '@/components/custom-icons';
import { MdArrowForwardIos, MdOutlineCheckBox } from 'react-icons/md';
import { ExperienceImpact, ExperienceImpactPopup, TExperienceImpact } from './ExperienceImpact';
import { isMobile } from 'react-device-detect';
import { Dialog, DialogTrigger } from '@/components/UI/dialog/dialog';
import { JSX, useState } from 'react';
import { TbCalendarWeek } from 'react-icons/tb';

type TSummary = {
  icon: TIconType;
  title: string;
  description: string;
  color: TColor;
};

type TExperience = {
  organization: string;
  location: string;
  experience: string;
  role: string;
  points: JSX.Element;
  color: TColor;
  icon: TIconSvg;
  impacts: TExperienceImpact[];
};

const summary: TSummary[] = [
  {
    icon: RxCalendar,
    title: calYearExperience(),
    description: 'Years of Experience',
    color: 'Purple',
  },
  {
    icon: FaArrowTrendUp,
    title: '30%',
    description: 'Increase in Repeat Bookings',
    color: 'Green',
  },
  {
    icon: BsFillLightningChargeFill,
    title: '20%',
    description: 'Fast Transactions',
    color: 'Yellow',
  },
  {
    icon: FaServer,
    title: 'Millions',
    description: 'Events & Requests Processed',
    color: 'Sky',
  },
  {
    icon: FaPeopleGroup,
    title: 'Multiple',
    description: 'Travel Platforms Integrated',
    color: 'Pink',
  },
];

const GPSBusTrackingSystem: TExperienceImpact = {
  icon: FaBusSimple,
  title: 'Real-Time Bus Tracking System',
  description:
    'Build a real-time GPS tracking platform that providers live bus location update to thousands of travelers.',
  impact: 'Improved customer experience',
  scale: 'Thousands of daily active users',
  ownership: 'End-to-end architecture & development',
  stack: (
    <BadgeContainer>
      <Java />
      <Springboot />
      <Kafka />
      <Elasticsearch />
      <MapApi />
    </BadgeContainer>
  ),
  achievements: [
    'Enabled live bus map visualization',
    'Indexed geo-location data in Elasticsearch',
    'Designed event-driven architecture',
  ],
};

const CoinRewardSystem: TExperienceImpact = {
  icon: FaGift,
  title: 'Coin-Based Reward System',
  description:
    'Designed and developed a customer rewards ecosystem allowing users to earn and redeem coins across bus ticket bookings.',
  impact: 'Improved customer loyalty and encouraged repeat bookings',
  scale: 'Thousands of reward transactions',
  ownership: 'Reward engine architecture',
  stack: (
    <BadgeContainer>
      <Java />
      <Springboot />
      <MySql />
    </BadgeContainer>
  ),
  achievements: [
    'Built scalable reward management system',
    'Implemented earning and redemption workflows',
    'Created transaction-safe reward ledger',
  ],
};

const QRPaymentSystem: TExperienceImpact = {
  icon: BsQrCodeScan,
  title: 'Global QR Payment Platform',
  description:
    'Build a centralized QR payment platform integrated across multiple products and reusable payment infrastructure for the organization.',
  impact: 'Multi-product Ecosystem',
  scale: 'High transaction volume processing',
  ownership: 'Database schema design & QR provider integrations',
  stack: (
    <BadgeContainer>
      <Java />
      <Springboot />
      <MySql />
      <RestAPI />
    </BadgeContainer>
  ),
  achievements: ['Centralized QR Payment System', '20% Faster Payment Processing'],
};

const FundTransferSystem: TExperienceImpact = {
  icon: BsBank2,
  title: 'Fund Transfer & Settlement Platform',
  description:
    'Designed and developed a secure fund transfer and settlement platform by integrating with multiple banking systems through real-time APIs.',
  impact: 'Improved operational efficiency',
  scale: 'Real-time fund settlements',
  ownership: 'Banking API integrations',
  stack: (
    <BadgeContainer>
      <Java />
      <Springboot />
      <JWT />
      <RestAPI />
    </BadgeContainer>
  ),
  achievements: ['Integrated multiple bank APIs', 'Implemented JWT security', 'Automated settlement lifecycle'],
};

const CleartripProject: TExperienceImpact = {
  icon: MdOutlineCheckBox,
  title: 'Cleartrip Bus Booking Integration',
  description: 'Partnered with Cleartrip to launch bus booking capabilities into their travel ecosystem.',
  impact: 'Launched bus booking for millions of Cleartrip users',
  scale: 'Large volume of bookings and searches',
  ownership: 'Partner onboarding and integration support',
  stack: (
    <BadgeContainer>
      <Java />
      <Springboot />
      <RestAPI />
    </BadgeContainer>
  ),
  achievements: [
    'Delivered reliable and scalable API integrations',
    'Ensured high availability and scalability',
    'Improved partner ecosystem connectivity',
  ],
};

const DatabaseMigration: TExperienceImpact = {
  icon: BsDatabaseCheck,
  title: 'Database Migration',
  description: 'Led the migration of legacy MSSQL databases to MySQL on AWS RDS.',
  impact: 'Reduced database licensing and infrastructure costs',
  scale: 'Enhanced Scalability & Reliability',
  ownership: 'Migration strategy and planning',
  stack: (
    <BadgeContainer>
      <MySql />
      <MSSql />
      <RDS />
      <DMS />
    </BadgeContainer>
  ),
  achievements: [
    'Refactored and optimized legacy stored procedures for MySQL compatibility',
    'Executed a zero-disruption migration strategy for production systems',
    'Improved database scalability and maintainability',
  ],
};

const GDSSystem: TExperienceImpact = {
  icon: BsGlobe,
  title: 'Global Distribution System (GDS)',
  description: 'Developed a real-time bus inventory aggregation platform with caching and event-driven processing.',
  impact: 'Provided a single source of truth for travel inventory across partners',
  scale: 'Large travel network',
  ownership: 'Aggregation services & Queue processing',
  stack: (
    <BadgeContainer>
      <Java />
      <Redis />
      <SQS />
    </BadgeContainer>
  ),
  achievements: [
    'Aggregated inventory from multiple providers',
    'Implemented Redis caching layer',
    'Built event-driven scheduling system',
  ],
};

const experiences: TExperience[] = [
  {
    organization: 'Maventech Labs Pvt. Ltd.',
    location: 'Bengaluru, India',
    experience: 'Sep 2021 - Present',
    role: 'Senior Software Engineer',
    points: (
      <BadgeContainer>
        <Badge title="Backend" color="Sky" />
        <Badge title="Payment" color="Sky" />
        <Badge title="Leadership" color="Sky" />
      </BadgeContainer>
    ),
    color: 'Sky',
    icon: MaventechLabsIcon,
    impacts: [GPSBusTrackingSystem, CoinRewardSystem, QRPaymentSystem, FundTransferSystem],
  },
  {
    organization: 'Cleartrip',
    location: 'Bengaluru, India',
    experience: '(Client Project)',
    role: 'Senior Software Engineer',
    points: (
      <BadgeContainer>
        <Badge title="6 Months" color="Pink" icon={TbCalendarWeek} />
        <Badge title="Travel Partner" color="Pink" />
      </BadgeContainer>
    ),
    color: 'Pink',
    icon: CleartripIcon,
    impacts: [CleartripProject],
  },
  {
    organization: 'Travelyaari (Mantis Technologies)',
    location: 'Bengaluru, India',
    experience: 'Dec 2018 - Aug 2021',
    role: 'Software Engineer',
    points: (
      <BadgeContainer>
        <Badge title="Data System" color="Green" />
        <Badge title="Performance" color="Green" />
      </BadgeContainer>
    ),
    color: 'Green',
    icon: TravelyaariIcon,
    impacts: [DatabaseMigration, GDSSystem],
  },
];

function Badge({ icon: Icon, title, color }: { icon?: TIconType; title: string; color: TColor }) {
  return (
    <div className={cn('inline-block text-xs px-1 py-0.5 border rounded-xs font-bold', CardColor[color])}>
      {Icon && <Icon className="inline-block -mt-1 mr-1" />}
      {title}
    </div>
  );
}

function BadgeContainer({ className, children }: BasicProps) {
  return <div className={cn('flex flex-wrap gap-1', className)}>{children}</div>;
}
function Java() {
  return <Badge title="Java" color="Pink" />;
}
function Springboot() {
  return <Badge title="Springboot" color="Pink" />;
}
function Kafka() {
  return <Badge title="Kafka" color="Sky" />;
}
function Elasticsearch() {
  return <Badge title="Elasticsearch" color="Sky" />;
}
function MySql() {
  return <Badge title="MySQL" color="Sky" />;
}
function MSSql() {
  return <Badge title="MSSQL" color="Sky" />;
}
function MapApi() {
  return <Badge title="Google Maps API" color="Yellow" />;
}
function Redis() {
  return <Badge title="Redis" color="Sky" />;
}
function RestAPI() {
  return <Badge title="Rest APIs" color="Yellow" />;
}
function RDS() {
  return <Badge title="AWS RDS" color="Yellow" />;
}
function DMS() {
  return <Badge title="AWS DMS" color="Yellow" />;
}
function SQS() {
  return <Badge title="AWS SQS" color="Yellow" />;
}
function JWT() {
  return <Badge title="JWT" color="Green" />;
}

function SummaryContainer({ children }: BasicProps) {
  return (
    <div className="sticky z-1 top-4 h-26">
      <div className="bg-background absolute z-0 -top-4 -left-4 -right-4 bottom-0"></div>
      <div className=" relative z-1 flex gap-4 w-[calc(100vw-78px)] sm:w-full sm:max-w-228 mx-auto overflow-x-auto">
        {children}
      </div>
    </div>
  );
}

function Summary({ icon: Icon, title, description, color }: TSummary) {
  return (
    <div
      className={cn(
        'w-43 sm:w-fit shrink-0 sm:shrink-1 grow-1 flex gap-3 sm:gap-5 p-3 border rounded-sm',
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

function ImpactButton({ color, ...props }: { color: TColor } & React.ComponentProps<'button'>) {
  return (
    <button
      className={cn(
        'absolute p-1 top-2 sm:top-6 right-2 sm:right-6 border rounded-full shadow-2xl active:scale-90',
        CardColor[color]
      )}
      {...props}
    >
      <MdArrowForwardIos className="size-5 sm:size-7" />
    </button>
  );
}

function ExperienceCard({
  organization,
  experience,
  role,
  location,
  points,
  color,
  icon: Icon,
  impacts,
  onClick,
}: TExperience & { onClick: () => void }) {
  return (
    <div
      className={cn(
        'relative ml-10 p-2 text-sm border rounded-sm',
        CardColor[color],
        "before:absolute before:content-[''] before:top-11 before:-bottom-4 last:before:bottom-2 before:-left-6 before:border-l-2 before:border-foreground/30"
      )}
    >
      <Icon className={cn('absolute size-8 p-1 top-2 -left-10 border rounded-md', CardColor[color])} />

      <div className="text-xs text-muted-foreground mb-1">{experience}</div>
      <div className="font-bold text-foreground">{role}</div>
      <div className="font-bold mb-1">{organization}</div>
      <div className="text-xs text-muted-foreground flex gap-1 items-center mb-2">
        <GrLocation />
        {location}
      </div>

      {points}

      {impacts.length > 0 &&
        (isMobile ? (
          <Dialog>
            <DialogTrigger asChild>
              <ImpactButton color={color} />
            </DialogTrigger>
            <ExperienceImpactPopup color={color} impacts={impacts} />
          </Dialog>
        ) : (
          <ImpactButton color={color} onClick={onClick} />
        ))}
    </div>
  );
}

export default function Experience(props: TFolderContent) {
  const [selectedExp, setSelectedExp] = useState(0);

  return (
    <FolderContent {...props} isGrid={false} orangeDrop={false}>
      <SummaryContainer>
        {summary.map((props) => (
          <Summary key={props.title} {...props} />
        ))}
      </SummaryContainer>

      <Container className="mt-3">
        <LeftSide>
          <h1 className="font-extrabold text-lg mb-2">
            Work <GradientText>Experience</GradientText> <BsStars className="inline text-yellow-400" />
          </h1>
          <div className="flex flex-col gap-3">
            {experiences.map((props, idx) => (
              <ExperienceCard key={idx} {...props} onClick={() => setSelectedExp(idx)} />
            ))}
          </div>
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
