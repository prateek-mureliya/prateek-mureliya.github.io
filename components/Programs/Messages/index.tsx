import { Button } from '@/components/UI/button';
import WindowBody, { WindowBodyProps } from '@/components/Window/window-body';
import { calYearExperience, cn } from '@/lib/utils';
import { TStringElement } from '@/types/globals';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useState } from 'react';
import { BsSoundwave } from 'react-icons/bs';
import { FaRegFaceSmile } from 'react-icons/fa6';
import { IoIosAppstore } from 'react-icons/io';
import { IoInformationCircleOutline, IoVideocamOutline } from 'react-icons/io5';
import { InlineIconBox } from '../Finder/Skills';
import {
  AWSIcon,
  DockerIcon,
  JavaIcon,
  MySqlIcon,
  PythonIcon,
  RedisIcon,
  SpringBootIcon,
  TIconSvg,
} from '@/components/custom-icons';
import { Dialog, DialogTrigger } from '@/components/UI/dialog/dialog';
import ContactUs from '../ContactUs';

type TMessage = {
  message: TStringElement;
  replies: TStringElement[];
};

const InlineIcon = ({ icon: Icon, iconName }: { icon: TIconSvg; iconName: string }) => (
  <InlineIconBox
    icon={Icon}
    iconName={iconName}
    className="[&>svg]:size-3 bg-blue-400/60 text-white font-normal px-1 rounded-md ml-1"
  />
);

const MESSAGES: TMessage[] = [
  {
    message: 'Hi 👋! Can you tell me about your technical skills?',
    replies: [
      <span key={0}>
        I work with
        <InlineIcon icon={JavaIcon} iconName="Java" />,
        <InlineIcon icon={SpringBootIcon} iconName="Spring Boot" />,<InlineIcon icon={PythonIcon} iconName="Python" />,
        <InlineIcon icon={MySqlIcon} iconName="MySQL" />,
        <InlineIcon icon={RedisIcon} iconName="Redis" />,
        <InlineIcon icon={DockerIcon} iconName="Docker" /> and
        <InlineIcon icon={AWSIcon} iconName="AWS (EC2, Lambda, S3, RDS, SQS)" />.
      </span>,
      <span key={1}>
        I specialize in building <b>scalable microservices</b> and <b>distributed systems</b> ⚡.
      </span>,
    ],
  },
  {
    message: 'How many years of experience 📅 do you have?',
    replies: [
      `I have ${calYearExperience()} years of experience in backend engineering, system design, and high-scale applications 🚀.`,
    ],
  },
  {
    message: 'What kind of projects 🛠️ have you worked on?',
    replies: [
      <div key={0}>
        <div className="mb-1">Some of my key projects are below:</div>
        <ul className="list-disc list-outside ml-4">
          <li>🚌 Real-time GPS tracking system</li>
          <li>🎫 Bus booking platforms</li>
          <li>🎁 Coin-based rewards & loyalty systems</li>
          <li>💳 QR payment integrationss</li>
          <li>🏦 Bank API integrations</li>
          <li>🔄 Large-scale database migrations</li>
          <li>⚡ Event-driven microservices</li>
        </ul>
      </div>,
    ],
  },
  {
    message: 'Have you worked with cloud technologies ☁️?',
    replies: [
      `Yes, I have extensive experience with AWS including EC2 🖥️, Lambda ⚡, S3 🪣, RDS 🗄️, SQS 📨, CloudWatch 📊 and IAM 🔐.`,
      `I've deployed and maintained production-scale cloud-native applications serving thousands of users.`,
    ],
  },
  {
    message: 'Have you led projects or mentored engineers 👨‍🏫?',
    replies: [
      `Yes! I've led architecture discussions 🏗️, designed scalable solutions 🚀, conducted code reviews ✅, mentored engineers 👨‍💻, and collaborated closely with product and business teams 🤝.`,
    ],
  },
  {
    message: 'What business impact have your projects delivered 📈?',
    replies: [
      <div key={0}>
        <ul className="list-disc list-outside ml-4">
          <li>🎁 Increased repeat bookings by 30% through a rewards platform.</li>
          <li>💳 Reduced payment transaction time by 20%.</li>
          <li>📡 Improved operational visibility with real-time GPS tracking.</li>
          <li>💰 Reduced infrastructure costs through cloud and database optimizations.</li>
        </ul>
      </div>,
    ],
  },
  {
    message: 'Why should we hire 🌟 you?',
    replies: [
      `Yes! I've led architecture discussions 🏗️, designed scalable solutions 🚀, conducted code reviews ✅, mentored engineers 👨‍💻, and collaborated closely with product and business teams 🤝.`,
    ],
  },
  {
    message: 'Are you open to new opportunities ✨?',
    replies: [
      `Absolutely! I'm interested in Senior Software Engineer 👨‍💻, Tech Lead 🏆 and Solution Architect 🏗️ roles where I can solve challenging problems and build impactful systems.`,
    ],
  },
  {
    message: 'How can we contact 📬 you?',
    replies: [
      <div key={0}>
        <div className="mb-2">
          🚀 Interested in working together? Feel free to reach out through the button below. 👇
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="w-full border border-white rounded-full hover:bg-blue-600 dark:hover:bg-blue-700 hover:text-white"
            >
              Get In Touch ✉️
            </Button>
          </DialogTrigger>
          <ContactUs />
        </Dialog>
      </div>,
    ],
  },
];

function Message({ message, replies }: TMessage) {
  const [showReplies, setShowReplies] = useState(false);

  const totalReplies = replies.length;
  const hasReplies = totalReplies > 0;

  const toggleReplies = useCallback(() => {
    setShowReplies((prev) => !prev);
  }, []);

  return (
    <div
      className={cn(
        'relative flex flex-col',
        hasReplies &&
          "before:absolute before:content-[''] before:top-0 before:bottom-6 before:left-6 before:w-24 before:rounded-bl-4xl before:border-6 before:border-gray-400 dark:before:border-gray-700 before:border-t-transparent before:border-r-transparent dark:before:border-t-transparent dark:before:border-r-transparent"
      )}
    >
      {/* Message */}
      <div className="relative">
        <div
          className={cn(
            'relative w-fit max-w-xs rounded-3xl rounded-bl-md bg-gray-300 px-4 py-2 text-black dark:bg-gray-200 sm:max-w-md',
            showReplies && 'border-b-6 border-background'
          )}
        >
          {message}

          <div className="absolute bottom-0 left-[-4px] h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-200" />
        </div>

        {hasReplies && (
          <Button
            variant="link"
            size="xs"
            className={cn('cursor-pointer transition-all duration-300', showReplies && 'ml-8')}
            onClick={toggleReplies}
          >
            {totalReplies} {totalReplies === 1 ? 'reply' : 'replies'}
          </Button>
        )}
      </div>

      {/* Replies */}
      <AnimatePresence initial={false}>
        {showReplies && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{
              duration: 0.25,
              ease: 'easeInOut',
            }}
            className="overflow-hidden"
          >
            {replies.map((reply, idx) => (
              <motion.div
                key={`${reply}-${idx}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: idx * 0.05,
                  duration: 0.2,
                }}
                className="relative ml-auto mb-1 mr-1 w-fit max-w-xs rounded-3xl bg-blue-500 px-4 py-2 text-white last:rounded-br-md sm:max-w-md border-l-6 border-background"
              >
                {reply}

                {idx === totalReplies - 1 && (
                  <div className="absolute right-[-4px] bottom-0 h-3 w-3 rounded-full bg-blue-500" />
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Messages({ isMaximized }: WindowBodyProps) {
  return (
    <WindowBody isMaximized={isMaximized} className="p-0 font-mono text-sm">
      {/* top bar */}
      <div className="absolute z-1 top-11 left-0 right-0 sm:right-4 bg-muted">
        <div className="max-w-xl mx-auto text-muted-foreground flex items-center gap-3 p-2">
          <span className="grow-1 font-bold">
            To:<span className="text-foreground ml-1">Recruiter</span>
          </span>

          <IoVideocamOutline className="size-5" />
          <IoInformationCircleOutline className="size-5" />
        </div>
      </div>

      {/* messages */}
      <div className="max-w-xl mx-auto p-2 mt-11 mb-11 flex flex-col gap-3 font-sans">
        <div className="text-xs text-muted-foreground text-center mb-1">Frequently Asked Questions</div>

        {MESSAGES.map((props, idx) => (
          <Message key={idx} {...props} />
        ))}
      </div>

      {/* bottom bar */}
      <div className={cn('absolute bottom-0 left-0 right-0 sm:right-4 bg-muted', isMaximized ? 'h-39' : '')}>
        <div className="max-w-xl mx-auto p-2 flex items-center gap-2">
          <IoIosAppstore className="size-7 text-muted-foreground" />

          <div className="grow-1 flex justify-between items-center h-7 py-1 p-2 text-xs bg-background text-muted-foreground border border-muted-foreground rounded-full">
            <span>Message</span>
            <BsSoundwave className="size-4" />
          </div>

          <FaRegFaceSmile className="size-6 text-muted-foreground" />
        </div>
      </div>
    </WindowBody>
  );
}
