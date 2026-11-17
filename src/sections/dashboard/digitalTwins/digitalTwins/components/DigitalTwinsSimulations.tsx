import { Box, CardMedia, CardMediaProps, Stack, StackProps, styled } from '@mui/material';
import type { EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState } from 'react';
import IconButton from 'components/@extended/IconButton';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import dataFlowArchitecture from 'assets/images/simulations/digital_twin_1_data_flow_architecture.gif';
import cityOperations from 'assets/images/simulations/digital_twin_2_city_operations.gif';
import fleetTracking from 'assets/images/simulations/digital_twin_3_fleet_tracking.gif';
import facilityManagement from 'assets/images/simulations/digital_twin_4_facility_management.gif';

const EmblaBox = styled(Box)(() => ({
  width: '100%'
}));

const EmblaViewport = styled(Box)(() => ({
  overflow: 'hidden',
  aspectRatio: '16/9'
  //   maxHeight: '100vh'
}));

const EmblaContainer = styled(Box)(() => ({
  height: '100%',
  display: 'flex',
  touchAction: 'pan-y pinch-zoom'
}));

const EmblaSlide = styled(Box)(() => ({
  height: '100%',
  flex: '0 0 100%',
  minWidth: 0
}));

const NavContainer = styled(Stack)<StackProps>(() => ({
  //   marginTop: '0.5rem',
  marginBottom: '0.5rem',
  width: '100%',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  gap: '1rem'
}));

const NavWrapper = styled(Stack)<StackProps>(() => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '0.5rem'
}));

const SimulationMedia = styled(CardMedia)<CardMediaProps>(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover'
}));

const mediaLinks = [dataFlowArchitecture, cityOperations, fleetTracking, facilityManagement];

const DigitalTwinsSimulations = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ stopOnMouseEnter: true, delay: 5000 })]);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedSnap, setSelectedSnap] = useState<number>(0);

  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  useEffect(() => {
    if (!emblaApi) return;

    const setupSnaps = (api: EmblaCarouselType) => setScrollSnaps(api.scrollSnapList());
    const updateSelectedSnap = (api: EmblaCarouselType) => setSelectedSnap(api.selectedScrollSnap());

    setupSnaps(emblaApi);
    updateSelectedSnap(emblaApi);

    emblaApi.on('reInit', setupSnaps);
    emblaApi.on('reInit', updateSelectedSnap);
    emblaApi.on('select', updateSelectedSnap);
    emblaApi.plugins().autoplay?.play();

    return () => {
      emblaApi.off('reInit', setupSnaps);
      emblaApi.off('reInit', updateSelectedSnap);
      emblaApi.off('select', updateSelectedSnap);
    };
  }, [emblaApi]);

  return (
    <EmblaBox>
      <NavContainer>
        <NavWrapper>
          <IconButton color="primary" size="medium" shape="rounded" variant="contained" onClick={scrollPrev}>
            <LeftOutlined />
          </IconButton>
          <IconButton color="primary" size="medium" shape="rounded" variant="contained" onClick={scrollNext}>
            <RightOutlined />
          </IconButton>
        </NavWrapper>

        <NavWrapper>
          {scrollSnaps.map((_, index) => (
            <IconButton
              sx={{ width: '1rem', height: '1rem' }}
              color="primary"
              size="small"
              shape="rounded"
              variant={index === selectedSnap ? 'contained' : 'outlined'}
              key={index}
              onClick={() => scrollTo(index)}
            ></IconButton>
          ))}
        </NavWrapper>
      </NavContainer>

      <EmblaViewport ref={emblaRef}>
        <EmblaContainer>
          {mediaLinks.map((link, index) => (
            <EmblaSlide key={index}>
              <SimulationMedia component="img" image={link} />
            </EmblaSlide>
          ))}
        </EmblaContainer>
      </EmblaViewport>

      {/* <NavContainer>
        <NavWrapper>
          <IconButton color="primary" size="medium" shape="rounded" variant="contained" onClick={scrollPrev}>
            <LeftOutlined />
          </IconButton>
          <IconButton color="primary" size="medium" shape="rounded" variant="contained" onClick={scrollNext}>
            <RightOutlined />
          </IconButton>
        </NavWrapper>

        <NavWrapper>
          {scrollSnaps.map((_, index) => (
            <IconButton
              sx={{ width: '1rem', height: '1rem' }}
              color="primary"
              size="small"
              shape="rounded"
              variant={index === selectedSnap ? 'contained' : 'outlined'}
              key={index}
              onClick={() => scrollTo(index)}
            ></IconButton>
          ))}
        </NavWrapper>
      </NavContainer> */}
    </EmblaBox>
  );
};

export default DigitalTwinsSimulations;
