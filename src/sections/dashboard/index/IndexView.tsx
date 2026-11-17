import { Box, BoxProps, GlobalStyles, Stack, StackProps, styled, Typography, TypographyProps } from '@mui/material';

const COLORS = {
  ink: '#183c37',
  muted: '#466159',
  subtle: '#59736b',
  accent: '#216353',
  border: '#cbd8ce',
  page: '#e9efeb',
  paper: '#fffef9',
  architecture: '#edf3eb',
  warning: '#b0802c',
  warningBg: '#f8f2e5',
  warningTitle: '#6c4e1e',
  warningText: '#66563b'
};

const MOBILE = '@media (max-width: 640px)';
const PRINT = '@media print';

const IndexContainer = styled(Box)<BoxProps>(() => ({
  width: '100%',
  padding: '32px 20px',
  fontFamily: '"Segoe UI", Arial, sans-serif',
  color: COLORS.ink,
  background: COLORS.page,
  '& *': {
    boxSizing: 'border-box'
  },
  [MOBILE]: {
    padding: 0
  },
  [PRINT]: {
    padding: 0,
    background: 'white'
  }
}));

const Sheet = styled(Box)<BoxProps>(() => ({
  maxWidth: 960,
  margin: 'auto',
  padding: '48px 52px 30px',
  background: COLORS.paper,
  borderTop: `8px solid ${COLORS.accent}`,
  boxShadow: `0 12px 48px ${COLORS.ink}10`,
  [MOBILE]: {
    padding: '28px 24px',
    boxShadow: 'none'
  },
  [PRINT]: {
    maxWidth: 'none',
    padding: '24px 20px 0',
    boxShadow: 'none'
  }
}));

const Eyebrow = styled(Typography)<TypographyProps>(() => ({
  margin: '0 0 20px',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  '& span': {
    float: 'right',
    color: COLORS.subtle,
    letterSpacing: '0.06em'
  },
  [MOBILE]: {
    '& span': {
      float: 'none',
      display: 'block',
      marginTop: 8
    }
  }
}));

const Title = styled(Typography)<TypographyProps>(() => ({
  maxWidth: 700,
  margin: 0,
  fontSize: 'clamp(32px, 5vw, 48px)',
  fontWeight: 700,
  lineHeight: 1.06,
  letterSpacing: '-0.045em',
  color: 'inherit',
  [PRINT]: {
    fontSize: 38
  }
}));

const Intro = styled(Typography)<TypographyProps>(() => ({
  maxWidth: 720,
  margin: '18px 0 26px',
  fontSize: 17,
  lineHeight: 1.5,
  color: COLORS.muted,
  [MOBILE]: {
    fontSize: 16
  },
  [PRINT]: {
    fontSize: 14,
    margin: '14px 0 20px'
  }
}));

const Counts = styled(Box)<BoxProps>(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 16,
  padding: '18px 0',
  borderBlock: `1px solid ${COLORS.border}`,
  [MOBILE]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 18
  },
  [PRINT]: {
    padding: '14px 0'
  }
}));

const CountValue = styled(Typography)<TypographyProps>(() => ({
  display: 'block',
  fontSize: 30,
  fontWeight: 700,
  letterSpacing: '-0.04em',
  lineHeight: 1.15,
  [PRINT]: {
    fontSize: 26
  }
}));

const CountLabel = styled(Typography)<TypographyProps>(() => ({
  display: 'block',
  marginTop: 4,
  fontSize: 12,
  color: COLORS.muted
}));

const Columns = styled(Box)<BoxProps>(() => ({
  display: 'grid',
  gridTemplateColumns: '1.2fr 1fr',
  gap: 36,
  marginTop: 26,
  [MOBILE]: {
    gridTemplateColumns: '1fr',
    gap: 22
  },
  [PRINT]: {
    gap: 28,
    marginTop: 22
  }
}));

const SectionHeading = styled(Typography)<TypographyProps>(() => ({
  margin: '0 0 12px',
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'inherit'
}));

const FeatureList = styled('ul')(() => ({
  margin: 0,
  paddingLeft: 17
}));

const FeatureItem = styled('li')(() => ({
  paddingLeft: 3,
  marginBottom: 12,
  fontSize: 13,
  lineHeight: 1.5,
  color: COLORS.muted,
  '&::marker': {
    color: COLORS.accent
  },
  '& strong': {
    color: COLORS.ink
  },
  [MOBILE]: {
    fontSize: 14
  },
  [PRINT]: {
    fontSize: 11,
    marginBottom: 10
  }
}));

const Note = styled(Box)<BoxProps>(() => ({
  '& p': {
    margin: 0,
    fontSize: 12,
    [PRINT]: {
      fontSize: 10.5
    }
  },
  [PRINT]: {
    breakInside: 'avoid'
  }
}));

const ArchitectureNote = styled(Note)<BoxProps>(() => ({
  marginTop: 22,
  padding: '16px 18px',
  background: COLORS.architecture,
  '& p': {
    lineHeight: 1.65,
    color: COLORS.muted
  }
}));

const BoundaryNote = styled(Note)<BoxProps>(() => ({
  marginTop: 24,
  padding: '15px 18px',
  borderLeft: `3px solid ${COLORS.warning}`,
  background: COLORS.warningBg,
  '& h2': {
    marginBottom: 6,
    color: COLORS.warningTitle
  },
  '& p': {
    lineHeight: 1.5,
    color: COLORS.warningText
  }
}));

const Footer = styled(Stack)<StackProps>(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: 24,
  marginTop: 22,
  paddingTop: 14,
  borderTop: `1px solid ${COLORS.border}`,
  fontSize: 10,
  lineHeight: 1.6,
  color: COLORS.subtle,
  '& p': {
    margin: 0
  },
  '& p:last-child': {
    flexShrink: 0,
    textAlign: 'right'
  },
  [MOBILE]: {
    flexDirection: 'column',
    gap: 10,
    '& p:last-child': {
      textAlign: 'left'
    }
  },
  [PRINT]: {
    fontSize: 9,
    breakInside: 'avoid'
  }
}));

interface Feature {
  title: string;
  description: string;
}

const counts = [
  { value: 20, label: 'Delivered fragments' },
  { value: 7, label: 'Dashboard widgets' },
  { value: 1, label: 'Simulation model' },
  { value: 3, label: 'Machine-learning models' }
];

const platformFeatures: Feature[] = [
  {
    title: 'Compose digital twins.',
    description: 'Connect reusable fragments and widgets in the Builder; manage definitions through registries and lifecycle services.'
  },
  {
    title: 'Connect transport data.',
    description: 'Ingestion and sharing services validate, normalize and exchange information from sensors and external systems.'
  },
  {
    title: 'Explore scenarios.',
    description: 'Registered models and simulation orchestration support parameterized runs and result dashboards.'
  },
  {
    title: 'Reuse ML capabilities.',
    description: 'Documented examples cover vehicle detection, lane-based counting and e-ticket demand forecasting.'
  },
  {
    title: 'Operate across infrastructure.',
    description: 'The blueprint describes identity, monitoring, durable messaging and Kubernetes-based edge–cloud workloads.'
  },
  {
    title: 'Inspect multiple levels of detail.',
    description: 'Aggregators provide compatible time grains and spatial grids for analysis.'
  }
];

const repositoryFeatures: Feature[] = [
  {
    title: 'Discover components.',
    description: 'Search and filter source-backed records with inputs, outputs, configuration, limitations and references.'
  },
  {
    title: 'Prepare scenarios offline.',
    description: 'Edit, validate, save and export browser-local drafts; recover edits and review import conflicts.'
  },
  {
    title: 'Preview the workflow.',
    description: 'Compare a fixed synthetic baseline and scenario, with explicit fixture provenance and evidence exports.'
  },
  {
    title: 'Validate stop-demand CSVs.',
    description:
      'Check structure, timestamps, counts and duplicates locally; export a provenance report. Imported data does not drive previews.'
  }
];

const renderFeatures = (features: Feature[]) => (
  <FeatureList>
    {features.map(({ title, description }) => (
      <FeatureItem key={title}>
        <strong>{title}</strong> {description}
      </FeatureItem>
    ))}
  </FeatureList>
);

const IndexView = () => {
  return (
    <IndexContainer>
      <GlobalStyles styles={{ '@page': { size: 'A4 portrait', margin: '12mm' } }} />
      <Sheet component="main">
        <header>
          <Eyebrow>
            OpenTwin Transport <span>Platform overview · November 2026</span>
          </Eyebrow>
          <Title variant="h1">
            Reusable building blocks
            <br />
            for transport digital twins.
          </Title>
          <Intro>
            A technical reference and offline workspace for transport researchers, planners and developers exploring data integration,
            simulation and machine learning.
          </Intro>
        </header>

        <Counts component="section" aria-label="Documented catalog">
          {counts.map(({ value, label }) => (
            <Box key={label}>
              <CountValue component="strong">{value}</CountValue>
              <CountLabel component="span">{label}</CountLabel>
            </Box>
          ))}
        </Counts>

        <Columns>
          <section aria-labelledby="platform-heading">
            <SectionHeading variant="h2" id="platform-heading">
              Documented platform · DigiTDevOps v0.5
            </SectionHeading>
            {renderFeatures(platformFeatures)}
          </section>

          <section aria-labelledby="available-heading">
            <SectionHeading variant="h2" id="available-heading">
              Available in this repository
            </SectionHeading>
            {renderFeatures(repositoryFeatures)}
            <ArchitectureNote component="aside" aria-labelledby="architecture-heading">
              <SectionHeading variant="h2" id="architecture-heading">
                Five-layer architecture
              </SectionHeading>
              <p>Physical environment → Integration → DigiTDevOps applications → Shared platform services → Cluster infrastructure.</p>
            </ArchitectureNote>
          </section>
        </Columns>

        <BoundaryNote component="aside" aria-labelledby="status-heading">
          <SectionHeading variant="h2" id="status-heading">
            Implementation status
          </SectionHeading>
          <p>
            The external platform is documented as a v0.5 / TRL4 prototype. This frontend does not connect to or execute its backend,
            simulation engine or ML models. Offline previews replay a fixed UI fixture, not Route 22 model outputs. Live integration awaits
            API contracts and access.
          </p>
        </BoundaryNote>

        <Footer component="footer">
          <p>
            Sources: fragment deliverables 1.5.2.1 (May 2026) and 1.5.2.2 (November 2026); platform deliverable 1.6.1 (September 2026). Six
            additional platform references are separate from the 20 delivered fragments.
          </p>
          <p>
            Local reference edition
            <br />
            16 November 2026
          </p>
        </Footer>
      </Sheet>
    </IndexContainer>
  );
};

export default IndexView;
